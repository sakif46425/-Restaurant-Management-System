<?php
// Only accept POST requests
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Check if 'email' field is provided
    if (!isset($_POST['email']) || empty(trim($_POST['email']))) {
        http_response_code(400);
        echo "Email field is required.";
        exit;
    }

    // Sanitize email input
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format.";
        exit;
    }

    // Simulate email sending (replace with real mail() if needed)
    // For now, just return success message
    http_response_code(200);
    echo "Verification email has been resent to $email.";

} else {
    http_response_code(405); // Method Not Allowed
    echo "Only POST requests are allowed.";
}
?>
