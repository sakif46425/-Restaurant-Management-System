<?php
session_start();

// Simulate a list of registered emails (in production, query your database)
$registeredEmails = ['user@example.com', 'test@domain.com'];

// Initialize variables
$emailError = '';
$resendInfo = '';
$email = '';

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email']);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailError = 'Please enter a valid email address.';
    }
    // Check if email exists in simulated list
    elseif (!in_array($email, $registeredEmails)) {
        $emailError = 'Email not found in our records.';
    }
    // Email is valid and exists
    else {
        // Store email in session
        $_SESSION['verified_email'] = $email;

        // Optional: Set a cookie to remember the user
        setcookie("verified_user", $email, time() + (86400 * 30), "/"); // valid for 30 days

        // Simulate email resend success
        $resendInfo = 'Verification email sent again!';
    }
}
?>
