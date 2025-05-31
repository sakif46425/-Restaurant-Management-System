<?php
require_once('../Model/UserModel_edit_profile.php');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize form inputs
    $fullName = trim($_POST['fullName']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $address = trim($_POST['address']);

    // Basic validation
    if ($fullName === "" || $email === "" || $phone === "") {
        echo "Name, Email, and Phone are required.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    if (!preg_match('/^\+?[0-9]{10,14}$/', $phone)) {
        echo "Invalid phone number format.";
        exit;
    }

    // Get user ID from session (assume user is logged in)
    $userId = $_SESSION['user_id']; 

    require_once('../Model/edit-profile-model.php');

    $result = updateProfile($userId, $fullName, $email, $phone, $address);

    if ($result === true) {
        echo "success"; 
    } else {
        echo "Error updating profile: $result";
    }
} else {
    header('Location: ../View/edit-profile.html');
    exit;
}
?>
