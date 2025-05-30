<?php
session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Database connection
    $con = mysqli_connect('127.0.0.1', 'root', '', 'rms');

    if (!$con) {
        die("Database connection failed: " . mysqli_connect_error());
    }

    // Get token from URL
    if (!isset($_GET['token'])) {
        echo "Invalid or missing token!";
        exit;
    }

    $token = mysqli_real_escape_string($con, $_GET['token']);

    // Get and sanitize new passwords
    $newPassword = trim($_POST['new-password']);
    $confirmPassword = trim($_POST['confirm-password']);

    if ($newPassword === '' || $confirmPassword === '') {
        echo "All fields are required!";
        exit;
    }

    if ($newPassword !== $confirmPassword) {
        echo "Passwords do not match!";
        exit;
    }

    // Check if token exists and not expired
    $query = "SELECT user_id, expires_at FROM password_reset_tokens WHERE token = '$token'";
    $result = mysqli_query($con, $query);

    if (!$result || mysqli_num_rows($result) === 0) {
        echo "Invalid or expired token!";
        exit;
    }

    $row = mysqli_fetch_assoc($result);
    $userId = $row['user_id'];
    $expiresAt = strtotime($row['expires_at']);

    if ($expiresAt < time()) {
        echo "Token has expired!";
        exit;
    }

    // Hash the new password
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Update password in users table
    $update = "UPDATE users SET password = '$hashedPassword' WHERE id = $userId";
    if (mysqli_query($con, $update)) {
        // Delete the token
        mysqli_query($con, "DELETE FROM password_reset_tokens WHERE user_id = $userId");
        echo "Password has been reset successfully!";
    } else {
        echo "Failed to reset password.";
    }

    mysqli_close($con);
} else {
    echo "Invalid request!";
}
?>
