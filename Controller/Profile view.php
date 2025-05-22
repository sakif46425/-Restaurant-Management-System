<?php
// Sample PHP validation code

// Simulate fetching data (e.g., from database or session)
$profileName = $_POST['name'] ?? '';
$profileEmail = $_POST['email'] ?? '';
$profilePhone = $_POST['phone'] ?? '';

$errors = [];

// Validate name
if (empty($profileName)) {
    $errors[] = "Name is required.";
} elseif (!preg_match("/^[a-zA-Z\s]+$/", $profileName)) {
    $errors[] = "Name must contain only letters and spaces.";
}

// Validate email
if (empty($profileEmail)) {
    $errors[] = "Email is required.";
} elseif (!filter_var($profileEmail, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email format.";
}

// Validate phone
if (empty($profilePhone)) {
    $errors[] = "Phone number is required.";
} elseif (!preg_match("/^[0-9]{10,15}$/", $profilePhone)) {
    $errors[] = "Phone number must be between 10 to 15 digits.";
}

// Display errors or proceed
if (!empty($errors)) {
    foreach ($errors as $error) {
        echo "<p style='color:red;'>$error</p>";
    }
} else {
    // Proceed with profile view or update
    echo "<p style='color:green;'>Profile data is valid.</p>";
}
?>
