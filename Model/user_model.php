<?php
require_once('DB_conn.php');

// Login function
function login($user) {
    $con = getConnection();

    $email = mysqli_real_escape_string($con, $user['email']);
    $role = mysqli_real_escape_string($con, $user['role']);
    $password = $user['password']; // keep raw for password_verify

    $sql = "SELECT * FROM users WHERE email='$email' AND role='$role'";
    $result = mysqli_query($con, $sql);

    if ($row = mysqli_fetch_assoc($result)) {
        return password_verify($password, $row['password']);
    }

    return false;
}
