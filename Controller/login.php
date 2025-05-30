<?php
error_reporting(E_ALL);
require_once('../model/user_Model.php');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $role = trim($_POST['role']);

    if ($email === "" || $password === "" || $role === "") {
        echo "All fields are required!";
    } else {
        $user = ['email' => $email, 'password' => $password, 'role' => $role];
        $status = login($user);

        if ($status) {
            setcookie('status', 'true', time() + 3000, '/');
            $_SESSION['email'] = $email;
            $_SESSION['role'] = $role;

            if ($role === 'admin') {
                header('Location: ../view/Home Dashboard.html');
            } else {
                header('Location: ../view/dashboard.html');
            }
        } else {
            echo "Invalid credentials!";
        }
    }
} else {
    header('Location: ../view/login.html');
}
?>
