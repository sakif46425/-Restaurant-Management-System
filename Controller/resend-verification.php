<?php
require_once '../Model/UserModel_verify_email.php'; // Adjust the path as needed
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);

    // Basic validation
    if (empty($email)) {
        echo "Email is required!";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format!";
        exit;
    }

    // Database connection
    $con = mysqli_connect('127.0.0.1', 'root', '', 'rms');
    if (!$con) {
        echo "Database connection failed: " . mysqli_connect_error();
        exit;
    }

    // Load user
    $userModel = new UserModel($con);
    $user = $userModel->getUserByEmail($email);

    if (!$user) {
        echo "No user found with this email.";
        exit;
    }

    if ($user['is_verified']) {
        echo "Email is already verified!";
        exit;
    }

    // Create token and expiration
    $token = md5(uniqid(rand(), true)); // beginner-friendly way
    $expiresAt = date('Y-m-d H:i:s', time() + 1800); // 30 minutes from now

    // Store token
    $success = $userModel->storeVerificationToken($user['id'], $token, $expiresAt);

    if ($success) {
        $verifyLink = "http://localhost/YourProjectFolder/Controller/verify-email.php?token=$token";
        $subject = "Verify Your Email Address";
        $message = "Hi {$user['full_name']},\n\n";
        $message .= "Click the link below to verify your email:\n";
        $message .= "$verifyLink\n\n";
        $message .= "Note: This link will expire in 30 minutes.\n";

        // Send email (simple version)
        if (mail($email, $subject, $message)) {
            echo "Verification email sent again!";
        } else {
            echo "Failed to send email.";
        }
    } else {
        echo "Token generation failed.";
    }

    mysqli_close($con);
} else {
    echo "Invalid request.";
}
?>
