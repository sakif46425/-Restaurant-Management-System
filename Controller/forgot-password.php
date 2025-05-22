<?php
session_start();

// Database connection (edit with your DB credentials)
$host = "localhost";
$user = "root";
$password = "";
$db = "Restuarant Management System";

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email']);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Invalid email address.";
        header("Location: forgot-password.php");
        exit();
    }

    // Check if email exists in users table
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        // Generate secure token
        $token = bin2hex(random_bytes(50));
        $expires = date("Y-m-d H:i:s", strtotime('+1 hour'));

        // Store token in password_resets table
        $stmt_insert = $conn->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");
        $stmt_insert->bind_param("sss", $email, $token, $expires);
        $stmt_insert->execute();

        // Set session variable
        $_SESSION['reset_email'] = $email;

       
        // mail($email, "Password Reset", "Click here to reset your password: $reset_link");

        $_SESSION['success'] = "A password reset link has been sent to your email.";
        header("Location: reset-password.php?token=$token");
    } else {
        $_SESSION['error'] = "Email not found.";
        header("Location: forgot-password.php");
    }

    $stmt->close();
    $conn->close();
}
?>
