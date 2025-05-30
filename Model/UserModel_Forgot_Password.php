<?php
require_once('DB_conn.php');

class UserModel {
    public $conn;

    public function __construct($dbConnection) {
        $this->conn = $dbConnection;
    }

    // Get user by email
    public function getUserByEmail($email) {
        $query = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query($this->conn, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            return mysqli_fetch_assoc($result);
        }

        return null;
    }

    // Store password reset token
    public function storeResetToken($userId, $token, $expiresAt) {
        // Remove old token if exists
        $deleteQuery = "DELETE FROM password_reset_tokens WHERE user_id = $userId";
        mysqli_query($this->conn, $deleteQuery);

        // Insert new token
        $insertQuery = "INSERT INTO password_reset_tokens (user_id, token, expires_at) 
                        VALUES ($userId, '$token', '$expiresAt')";
        return mysqli_query($this->conn, $insertQuery);
    }

    // Check if reset token is valid
    public function getUserIdByToken($token) {
        $query = "SELECT user_id, expires_at FROM password_reset_tokens WHERE token = '$token'";
        $result = mysqli_query($this->conn, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $expiresAt = strtotime($row['expires_at']);

            if ($expiresAt > time()) {
                return $row['user_id'];
            }
        }

        return false;
    }

    // Update user password
    public function updatePassword($userId, $newHashedPassword) {
        $query = "UPDATE users SET password = '$newHashedPassword' WHERE id = $userId";
        return mysqli_query($this->conn, $query);
    }
}
?>
