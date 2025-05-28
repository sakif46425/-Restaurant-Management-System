<?php
session_start();
require_once '../Model/DBsignup.php';

$errors = [];

// Check if form submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize inputs
    $fullName = trim(htmlspecialchars($_POST["full-name"] ?? ''));
    $email = trim(htmlspecialchars($_POST["email"] ?? ''));
    $password = $_POST["password"] ?? '';
    $confirmPassword = $_POST["confirm-password"] ?? '';
    $userRole = $_POST["user-role"] ?? '';

    // Validate inputs
    if (empty($fullName)) {
        $errors['full-name'] = "Full name is required.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format.";
    }

    if (strlen($password) < 6) {
        $errors['password'] = "Password must be at least 6 characters.";
    }

    if ($password !== $confirmPassword) {
        $errors['confirm-password'] = "Passwords do not match.";
    }

    $validRoles = ['admin', 'editor', 'user'];
    if (!in_array($userRole, $validRoles)) {
        $errors['user-role'] = "Please select a valid user role.";
    }

    // If no errors, proceed
    if (empty($errors)) {
        // Check if email already exists
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $errors['email'] = "Email is already registered.";
        } else {
            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Insert user into DB
            $stmt = $conn->prepare("INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $fullName, $email, $hashedPassword, $userRole);

            if ($stmt->execute()) {
                // Redirect to verification page
                header("Location: ../View/email-verification.html");
                exit();
            } else {
                $errors['database'] = "Database error: " . $stmt->error;
            }
        }

        $stmt->close();
    }
    $conn->close();
}
?>

<!-- Display errors (optional if handled in view) -->
<?php if (!empty($errors)): ?>
    <div class="error-box">
        <ul>
            <?php foreach ($errors as $field => $error): ?>
                <li><strong><?= ucfirst($field) ?>:</strong> <?= $error ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>
