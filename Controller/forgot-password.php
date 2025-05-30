<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);

    // Validate email
    if (empty($email)) {
        echo "Email is required!";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format!";
        exit;
    }

    // Connect to DB
    $con = mysqli_connect('127.0.0.1', 'root', '', 'rms');
    if (!$con) {
        echo "Database connection failed: " . mysqli_connect_error();
        exit;
    }

    // Check if user exists
    $escapedEmail = mysqli_real_escape_string($con, $email);
    $query = "SELECT id, full_name FROM users WHERE email = '$escapedEmail'";
    $result = mysqli_query($con, $query);

    if (mysqli_num_rows($result) === 0) {
        echo "No account found with that email.";
        mysqli_close($con);
        exit;
    }

    $row = mysqli_fetch_assoc($result);
    $userId = $row['id'];
    $fullName = $row['full_name'];

    // Generate token and expiration
    $token = md5(uniqid(rand(), true));
    $expiresAt = date('Y-m-d H:i:s', time() + 3600); // 1 hour from now

    // Remove old token if exists
    mysqli_query($con, "DELETE FROM password_reset_tokens WHERE user_id = $userId");

    // Insert token into DB
    $insertQuery = "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($userId, '$token', '$expiresAt')";
    if (mysqli_query($con, $insertQuery)) {
        // Prepare reset link
        $resetLink = "http://localhost/YourProjectFolder/View/reset-password.html?token=$token";
        $subject = "Password Reset Request";
        $message = "Hi $fullName,\n\n";
        $message .= "To reset your password, click the link below:\n$resetLink\n\n";
        $message .= "This link will expire in 1 hour.\n";

        // Send email
        if (mail($email, $subject, $message)) {
            echo "Reset link sent. Check your email.";
        } else {
            echo "Failed to send reset email.";
        }
    } else {
        echo "Something went wrong. Try again.";
    }

    mysqli_close($con);
} else {
    echo "Invalid request.";
}
?>
