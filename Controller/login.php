<?php
session_start();

// Get form data
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $role = $_POST['role'];

    // Basic validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email format.'); window.history.back();</script>";
        exit();
    }

    if (strlen($password) < 6) {
        echo "<script>alert('Password must be at least 6 characters.'); window.history.back();</script>";
        exit();
    }

    if (empty($role)) {
        echo "<script>alert('Please select a role.'); window.history.back();</script>";
        exit();
    }

    // Use external file for authentication logic
    require_once 'auth.php';

    // Check credentials using custom function
    if (check_credentials($email, $password, $role)) {
        $_SESSION['email'] = $email;
        $_SESSION['role'] = $role;

        // Redirect based on role
        if ($role === "admin") {
            header("Location: Home Dashboard.html");
        } else {
            echo "<script>alert('Login successful, but no redirect configured for this role.');</script>";
        }
    } else {
        echo "<script>alert('Incorrect email, password, or role.'); window.history.back();</script>";
    }
} else {
    header("Location: login.html");
    exit();
}
?>
