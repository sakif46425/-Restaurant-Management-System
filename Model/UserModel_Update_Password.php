<?php
class UserModel {
    private $con;

    public function __construct() {
        // Connect to the database
        $this->con = mysqli_connect('127.0.0.1', 'root', '', 'rms');

        // Check connection
        if (!$this->con) {
            die("Connection failed: " . mysqli_connect_error());
        }
    }

    // Get the hashed password of the user
    public function getPasswordById($userId) {
        $sql = "SELECT password FROM users WHERE id = '$userId'";
        $result = mysqli_query($this->con, $sql);

        if (mysqli_num_rows($result) === 1) {
            $row = mysqli_fetch_assoc($result);
            return $row['password'];
        }

        return false;
    }

    // Update the user's password
    public function updateUserPassword($userId, $newHashedPassword) {
        $sql = "UPDATE users SET password = '$newHashedPassword' WHERE id = '$userId'";
        return mysqli_query($this->con, $sql);
    }

    // Close connection when object is destroyed
    public function __destruct() {
        mysqli_close($this->con);
    }
}
?>
