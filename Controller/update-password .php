<?php
session_start();
include 'db_connect.php'; // make sure this connects to your DB

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = $_SESSION['user_id']; // Assumes user ID is stored in session
    $currentPassword = $_POST['currentPassword'];
    $newPassword = $_POST['newPassword'];

    // Fetch current password hash from database
    $stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stmt->bind_result($storedHash);
    $stmt->fetch();
    $stmt->close();

    // Verify current password
    if (!password_verify($currentPassword, $storedHash)) {
        echo "<script>alert('Current password is incorrect.'); window.history.back();</script>";
        exit();
    }

    // Hash and update the new password
    $newHash = password_hash($newPassword, PASSWORD_DEFAULT);
    $update = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
    $update->bind_param("si", $newHash, $userId);

    if ($update->execute()) {
        echo "<script>alert('Password updated successfully.'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Failed to update password.'); window.history.back();</script>";
    }

    $update->close();
    $conn->close();
}
?>
