<?php
session_start();
require_once 'db.php'; // include your DB connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize & fetch inputs
    $fullName = trim($_POST['full-name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm-password'] ?? '';

    $errors = [];

    // Validate full name
    if (empty($fullName)) {
        $errors[] = "Full name is required.";
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // Validate password
    if (strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters.";
    }

    // Validate confirm password
    if ($password !== $confirmPassword) {
        $errors[] = "Passwords do not match.";
    }

    // Check if email already exists
    if (empty($errors)) {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $errors[] = "Email is already registered.";
        }
        $stmt->close();
    }

    // Register user if no errors
    if (empty($errors)) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $fullName, $email, $hashedPassword);

        if ($stmt->execute()) {
            // Set session
            $_SESSION['user'] = [
                'id' => $stmt->insert_id,
                'name' => $fullName,
                'email' => $email
            ];

            // Set cookie (valid for 7 days)
            setcookie("user_email", $email, time() + (86400 * 7), "/");

            header("Location: ../View/login.html");
            $_SESSION['message'] = "Registration successful. Please log in.";
            exit();
        } else {
            $errors[] = "Registration failed. Try again.";
        }

        $stmt->close();
    }

    // Show errors (if any)
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<p style='color:red;'>$error</p>";
        }
        echo "<a href='../View/signup.html'>Back</a>";
    }

    $conn->close();
}
?>
