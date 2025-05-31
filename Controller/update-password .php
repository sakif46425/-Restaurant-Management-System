<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: ../View/login.html');
    exit;
}

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form inputs
    $currentPassword = trim($_POST['currentPassword']);
    $newPassword = trim($_POST['newPassword']);
    $confirmPassword = trim($_POST['confirmPassword']);
    $userId = $_SESSION['user_id']; // From session

    // Validate inputs
    if ($currentPassword === "" || $newPassword === "" || $confirmPassword === "") {
        echo "All fields are required!";
        exit;
    }

    if (strlen($newPassword) < 6) {
        echo "New password must be at least 6 characters.";
        exit;
    }

    if ($newPassword !== $confirmPassword) {
        echo "New passwords do not match!";
        exit;
    }

    // Include the model
    require_once '../Model/Usermodel_update_password.php';

    // Create model object
    $userModel = new UserModel();

    // Get current hashed password from database
    $storedHash = $userModel->getPasswordById($userId);

    if (!$storedHash || !password_verify($currentPassword, $storedHash)) {
        echo "Current password is incorrect!";
        exit;
    }

    // Hash the new password
    $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Update password in the database
    $success = $userModel->updateUserPassword($userId, $hashedNewPassword);

    if ($success) {
        echo "Password updated successfully!";
     
        exit;
    } else {
        echo "Failed to update password.";
    }
} else {
    header('Location: ../View/update-password.html');
    exit;
}
?>
