<?php

require_once('../Model/UserModel_Profile_view.php'); // Include the model to get user data
session_start(); // Start the session

// Only run if the form was submitted using POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get data sent from the form
    $profileName = $_POST['name'] ?? 'No Name';
    $profileEmail = $_POST['email'] ?? 'No Email';
    $profilePhone = $_POST['phone'] ?? 'No Phone';

    // Send data to the view
    include '../View/view-profile.php';
} else {
    // If not POST request, go back to login page
    header('Location: ../View/login.html');
    exit;
}
?>
