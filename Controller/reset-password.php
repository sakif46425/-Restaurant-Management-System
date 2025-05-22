<?php
session_start();

// Example: Check if user is authenticated via session or reset token
if (!isset($_SESSION['user_id'])) {
    // Redirect to login if not authenticated
    header("Location: login.php");
    exit();
}

// Assume you are using a MySQL database connection
require_once 'db.php'; // Contains connection variable $conn

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newPassword = trim($_POST['new-password']);
    $confirmPassword = trim($_POST['confirm-password']);
    $errors = [];

    // Validation
    if (strlen($newPassword) < 6) {
        $errors[] = "Password must be at least 6 characters long.";
    }

    if ($newPassword !== $confirmPassword) {
        $errors[] = "Passwords do not match.";
    }

    if (empty($errors)) {
        // Hash the password
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        // Update password in database (assuming users table and user_id in session)
        $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
        $stmt->bind_param("si", $hashedPassword, $_SESSION['user_id']);

        if ($stmt->execute()) {
            // Optional: Destroy session and force re-login
            session_destroy();
            setcookie("auth_token", "", time() - 3600, "/"); // Remove auth cookie if used
            echo "Password has been reset successfully. <a href='login.php'>Login again</a>";
        } else {
            echo "Error resetting password. Please try again.";
        }

        $stmt->close();
    } else {
        // Display validation errors
        foreach ($errors as $error) {
            echo "<p style='color:red;'>$error</p>";
        }
    }
}
?>
