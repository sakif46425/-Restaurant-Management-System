\<?php
session_start();

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get inputs and trim whitespace
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $role = trim($_POST['role'] ?? '');

    $errors = [];

    // Email validation
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // Password validation
    if (empty($password)) {
        $errors[] = "Password is required.";
    } elseif (strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters long.";
    }

    // Role validation
    $validRoles = ['admin', 'editor', 'user'];
    if (empty($role)) {
        $errors[] = "Role is required.";
    } elseif (!in_array($role, $validRoles)) {
        $errors[] = "Invalid role selected.";
    }

    // If validation fails
    if (!empty($errors)) {
        echo "<h3 style='color: red;'>Validation Errors:</h3><ul>";
        foreach ($errors as $error) {
            echo "<li>" . htmlspecialchars($error) . "</li>";
        }
        echo "</ul><a href='login.html'>Go back</a>";
        exit();
    }

    // Fake user database
    $users = [
        ['email' => 'admin@example.com', 'password' => 'admin123', 'role' => 'admin'],
        ['email' => 'editor@example.com', 'password' => 'editor123', 'role' => 'editor'],
        ['email' => 'user@example.com', 'password' => 'user123', 'role' => 'user'],
    ];

    // Check credentials
    $loginSuccess = false;
    foreach ($users as $user) {
        if (
            strtolower($user['email']) === strtolower($email) &&
            $user['password'] === $password &&
            $user['role'] === $role
        ) {
            $loginSuccess = true;
            $_SESSION['email'] = $email;
            $_SESSION['role'] = $role;
            break;
        }
    }

    if ($loginSuccess) {
        echo "<h2>Login successful as " . ucfirst($role) . "!</h2>";
        echo "<p>Welcome, $email</p>";
        echo "<a href='logout.php'>Logout</a>";
    } else {
        echo "<h2 style='color: red;'>Incorrect email, password, or role.</h2>";
        echo "<a href='login.html'>Back to Login</a>";
    }

} else {
    // Redirect if accessed without POST
    header("Location: login.html");
    exit();
}
?>
