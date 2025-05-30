<?php
require_once '../Model/UserModel_verify_email.php';

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    $con = new mysqli('127.0.0.1', 'root', '', 'rms');
    if ($con->connect_error) {
        die("DB connection failed: " . $con->connect_error);
    }

    $userModel = new UserModel($con);

    if ($userModel->verifyEmail($token)) {
        echo "<h2>Email successfully verified!</h2>";
        echo '<a href="../View/login.html">Click here to login</a>';
    } else {
        echo "<h2>Invalid or expired token.</h2>";
        echo '<a href="../View/resend-verification.html">Resend Verification Email</a>';
    }

    $con->close();
} else {
    echo "Token missing.";
}
?>
