<?php
session_start();
require_once 'AvatarModel.php';

// For demo, set user_id = 1
if (!isset($_SESSION['user_id'])) {
    $_SESSION['user_id'] = 1;
}

$userId = $_SESSION['user_id'];
$model = new AvatarModel($userId);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['action']) && $_POST['action'] === 'reset') {
        $result = $model->deleteAvatar();
        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'Avatar reset successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to reset avatar']);
        }
        exit;
    }

    if (isset($_POST['avatar'])) {
        $saved = $model->saveAvatar($_POST['avatar']);
        if ($saved) {
            echo json_encode(['status' => 'success', 'file' => $model->getAvatarPath()]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to save avatar']);
        }
        exit;
    }

    echo json_encode(['status' => 'error', 'message' => 'No avatar data sent']);
    exit;

} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit;
}
?>
