<?php
session_start();

$uploadDir = 'uploads/';
$avatarFile = $uploadDir . 'avatar_' . session_id() . '.png';

// Ensure uploads directory exists
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle reset request
    if (isset($_POST['action']) && $_POST['action'] === 'reset') {
        if (file_exists($avatarFile)) {
            if (unlink($avatarFile)) {
                echo json_encode(['status' => 'success', 'message' => 'Avatar reset successfully.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to delete avatar.']);
            }
        } else {
            echo json_encode(['status' => 'success', 'message' => 'No avatar to delete.']);
        }
        exit;
    }

    // Handle avatar image upload
    if (isset($_POST['avatar'])) {
        $data = $_POST['avatar'];
        $data = str_replace('data:image/png;base64,', '', $data);
        $data = str_replace(' ', '+', $data); // Replace spaces with +
        $decodedData = base64_decode($data);

        if ($decodedData === false) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid image data.']);
            exit;
        }

        if (file_put_contents($avatarFile, $decodedData)) {
            echo json_encode(['status' => 'success', 'file' => $avatarFile]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to save avatar.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No avatar data received.']);
    }
}
?>
