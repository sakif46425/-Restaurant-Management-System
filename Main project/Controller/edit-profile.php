<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input
    $fullName = trim(htmlspecialchars($_POST["fullName"] ?? ''));
    $email = trim(htmlspecialchars($_POST["email"] ?? ''));
    $phone = trim(htmlspecialchars($_POST["phone"] ?? ''));
    $address = trim(htmlspecialchars($_POST["address"] ?? ''));

    $errors = [];

    // Basic validation
    if (empty($fullName) || empty($email) || empty($phone)) {
        $errors[] = "Name, Email, and Phone are required.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    if (!preg_match("/^\+?[0-9]{10,14}$/", $phone)) {
        $errors[] = "Invalid phone number format.";
    }

    if (empty($errors)) {
        // Example: Save to session (you could also save to a database)
        $_SESSION["profile"] = [
            "fullName" => $fullName,
            "email" => $email,
            "phone" => $phone,
            "address" => $address
        ];

        // Redirect or success message
        echo "<script>alert('Profile updated successfully!'); window.location.href='index.html';</script>";
        exit;
    } else {
        // Display errors
        foreach ($errors as $err) {
            echo "<p style='color:red;'>$err</p>";
        }
        echo "<a href='javascript:history.back()'>Go Back</a>";
    }
} else {
    // If accessed directly without POST
    header("Location: login.html");
    exit;
}
?>
