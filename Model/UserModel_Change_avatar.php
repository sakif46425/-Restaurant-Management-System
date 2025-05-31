<?php
class UserModel {
    private $conn;

    // Constructor: Connect to database
    public function __construct() {
        $this->conn = mysqli_connect('127.0.0.1', 'root', '', 'rms');

        if (!$this->conn) {
            die("Database connection failed: " . mysqli_connect_error());
        }
    }

    // Close DB connection
    public function __destruct() {
        mysqli_close($this->conn);
    }

    // Check if email already exists in users table
    public function emailExists($email) {
        $email = mysqli_real_escape_string($this->conn, $email);
        $sql = "SELECT id FROM users WHERE email = '$email' LIMIT 1";
        $result = mysqli_query($this->conn, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            return true;  // Email exists
        }
        return false; // Email does not exist
    }

    // Register a new user
    public function registerUser($fullName, $email, $hashedPassword, $role) {
        $fullName = mysqli_real_escape_string($this->conn, $fullName);
        $email = mysqli_real_escape_string($this->conn, $email);
        $hashedPassword = mysqli_real_escape_string($this->conn, $hashedPassword);
        $role = mysqli_real_escape_string($this->conn, $role);

        $sql = "INSERT INTO users (full_name, email, password, role) VALUES ('$fullName', '$email', '$hashedPassword', '$role')";

        if (mysqli_query($this->conn, $sql)) {
            return true;  // Registration successful
        } else {
            return false; // Registration failed
        }
    }

    // Get user data by email (for login, for example)
    public function getUserByEmail($email) {
        $email = mysqli_real_escape_string($this->conn, $email);
        $sql = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
        $result = mysqli_query($this->conn, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            return mysqli_fetch_assoc($result);
        }
        return null; // No user found
    }
}
