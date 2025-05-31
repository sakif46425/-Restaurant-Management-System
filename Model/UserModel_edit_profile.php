<?php
require_once('DB_conn.php');
// Function to update the user's profile
function updateProfile($userId, $fullName, $email, $phone, $address) {
    $con = connectDatabase();

    // Sanitize input to avoid SQL injection
    $fullName = mysqli_real_escape_string($con, $fullName);
    $email = mysqli_real_escape_string($con, $email);
    $phone = mysqli_real_escape_string($con, $phone);
    $address = mysqli_real_escape_string($con, $address);

    $sql = "UPDATE users SET 
                full_name = '$fullName', 
                email = '$email', 
                phone = '$phone', 
                address = '$address' 
            WHERE id = $userId";

    if (mysqli_query($con, $sql)) {
        mysqli_close($con);
        return true;
    } else {
        $error = mysqli_error($con);
        mysqli_close($con);
        return $error;
    }
}

// Optional: Get current user info to display in form
function getUserById($userId) {
    $con = connectDatabase();

    $sql = "SELECT * FROM users WHERE id = $userId";
    $result = mysqli_query($con, $sql);

    if ($result && mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);
        mysqli_close($con);
        return $user;
    } else {
        mysqli_close($con);
        return null;
    }
}
?>
