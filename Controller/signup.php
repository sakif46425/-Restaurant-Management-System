<?php


session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize form inputs
    $fullName = trim($_POST['full-name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirmPassword = trim($_POST['confirm-password']);
    $userRole = trim($_POST['user-role']);

    // Basic validation
    if ($fullName === "" || $email === "" || $password === "" || $confirmPassword === "" || $userRole === "") {
        echo "All fields are required!";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format!";
        exit;
    }

    if ($password !== $confirmPassword) {
        echo "Passwords do not match!";
        exit;
    }

    // Optional: Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // DB connection
    $con = mysqli_connect('127.0.0.1', 'root', '', 'rms');

    if (!$con) {
        die("Database connection failed: " . mysqli_connect_error());
    }

    // Insert into users table (adjust table/column names if different)
    $sql = "INSERT INTO users (full_name, email, password, role) 
            VALUES ('$fullName', '$email', '$hashedPassword', '$userRole')";

    if (mysqli_query($con, $sql)) {
        header('Location: ../View/login.html');
        exit;
    } else {
        echo "Error: " . mysqli_error($con);
        
    }

    mysqli_close($con);
} else {
    // If form was not submitted properly
    header('Location: ../View/signup.html');
    exit;
}
?>
