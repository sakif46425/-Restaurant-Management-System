<?php
require_once('DB_conn.php');
class UserModel {
    private $conn;

    // Constructor to receive the DB connection
    public function __construct($dbConn) {
        $this->conn = $dbConn;
    }

    // Get user by email
    public function getUserByEmail($email) {
        $email = mysqli_real_escape_string($this->conn, $email);
        $sql = "SELECT id, full_name, is_verified FROM users WHERE email = '$email'";
        $result = mysqli_query($this->conn, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            return mysqli_fetch_assoc($result);
        }

        return null;
    }

    // Save password reset token
    public function storeResetToken($userId, $token, $expiresAt) {
        // First delete any existing token for this user
        $deleteSql = "DELETE FROM password_reset_tokens WHERE user_id = $userId";
        mysqli_query($this->conn, $deleteSql);

        // Insert new token
        $token = mysqli_real_escape_string($this->conn, $token);
        $expiresAt = mysqli_real_escape_string($this->conn, $expiresAt);

        $sql = "INSERT INTO password_reset_tokens (user_id, token, expires_at) 
                VALUES ($userId, '$token', '$expiresAt')";

        return mysqli_query($this->conn, $sql);
    }

    // Verify token and return user ID
    public function getUserIdByToken($token) {
        $token = mysqli_real_escape_string($this->conn, $token);
        $sql = "SELECT user_id, expires_at FROM password_reset_tokens WHERE token = '$token'";
        $result = mysqli_query($this->conn, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            $data = mysqli_fetch_assoc($result);
            $expiresAt = strtotime($data['expires_at']);

            if ($expiresAt > time()) {
                return $data['user_id'];
            }
        }

        return null;
    }

    // Update password
    public function updatePassword($userId, $newHashedPassword) {
        $newHashedPassword = mysqli_real_escape_string($this->conn, $newHashedPassword);
        $sql = "UPDATE users SET password = '$newHashedPassword' WHERE id = $userId";
        return mysqli_query($this->conn, $sql);
    }

    // Delete reset token
    public function deleteResetToken($userId) {
        $sql = "DELETE FROM password_reset_tokens WHERE user_id = $userId";
        return mysqli_query($this->conn, $sql);
    }
}
?>
