<?php

require_once('DB_conn.php');
// Function to get user info by user ID
function getUserById($userId) {
    $conn = connectDatabase();

    // Create SQL query
    $sql = "SELECT full_name, email, phone FROM users WHERE id = $userId";

    // Run the query
    $result = mysqli_query($conn, $sql);

    // Check if we got a result
    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result); // Get user data as array
    } else {
        $user = null; // No user found
    }

    // Close the connection
    mysqli_close($conn);

    return $user;
}
?>
