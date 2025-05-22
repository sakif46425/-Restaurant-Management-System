<?php
session_start();

// Sample user data (replace with DB lookup in production)
$users = [
    "user@example.com" => password_hash("password123", PASSWORD_DEFAULT),
    "admin@example.com" => password_hash("admin456", PASSWORD_DEFAULT)
];

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    $errors = [];

    // Validate email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email address.";
    }

    // Validate password
    if (empty($password) || strlen($password) < 6) {
        $errors['password'] = "Password must be at least 6 characters.";
    }

    // Check credentials if no validation errors
    if (empty($errors)) {
        if (isset($users[$email]) && password_verify($password, $users[$email])) {
            // Success: set session and cookie
            $_SESSION['user_email'] = $email;
            setcookie("user_email", $email, time() + 3600, "/"); // 1 hour cookie

            header("Location: Home Dashboard.php"); // Redirect to protected page
            exit();
        } else {
            $errors['auth'] = "Incorrect email or password.";
        }
    }
}
?>
