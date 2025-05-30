<?php
require_once('DB_conn.php');
class UserModel {
    private $conn;

    public function __construct($dbConn) {
        $this->conn = $dbConn;
    }

    // Get user by email
    public function getUserByEmail($email) {
        $email = mysqli_real_escape_string($this->conn, $email);

        $query = "SELECT id, full_name, is_verified FROM users WHERE email = '$email'";
        $result = mysqli_query($this->conn, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            return mysqli_fetch_assoc($result);
        }

        return null;
    }

    // Store or update verification token
    public function storeVerificationToken($userId, $token, $expiresAt) {
        // Delete old token
        mysqli_query($this->conn, "DELETE FROM email_verification_tokens WHERE user_id = $userId");

        // Insert new token
        $query = "INSERT INTO email_verification_tokens (user_id, token, expires_at)
                  VALUES ($userId, '$token', '$expiresAt')";
        return mysqli_query($this->conn, $query);
    }

    // Verify email using token
    public function verifyEmail($token) {
        $token = mysqli_real_escape_string($this->conn, $token);

        $query = "SELECT user_id, expires_at FROM email_verification_tokens WHERE token = '$token'";
        $result = mysqli_query($this->conn, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $userId = $row['user_id'];
            $expiresAt = $row['expires_at'];

            if (strtotime($expiresAt) > time()) {
                // Mark user as verified
                mysqli_query($this->conn, "UPDATE users SET is_verified = 1 WHERE id = $userId");

                // Delete token
                mysqli_query($this->conn, "DELETE FROM email_verification_tokens WHERE user_id = $userId");

                return true;
            }
        }

        return false;
    }
}
?>
