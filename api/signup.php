<?php
session_start();
require_once '../db.php'; // Your DB connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = trim($_POST['first_name'] ?? '');
    $lastName = trim($_POST['last_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    
    // Basic validation
    if (!$firstName || !$lastName || !$email || !$password || !$confirmPassword) {
        header('Location: ../pages/signup.html?error=missing_fields');
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Location: ../pages/signup.html?error=invalid_email');
        exit;
    }
    if ($password !== $confirmPassword) {
        header('Location: ../pages/signup.html?error=password_mismatch');
        exit;
    }
    if (strlen($password) < 8) {
        header('Location: ../pages/signup.html?error=password_too_short');
        exit;
    }

    // Check if email exists
    $stmt = $conn->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        header('Location: ../pages/signup.html?error=email_exists');
        exit;
    }
    $stmt->close();

    // Hash password
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Insert new user, role default 'user'
    $fullName = $firstName . ' ' . $lastName;
    $stmt = $conn->prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
    $role = 'user';
    $stmt->bind_param('ssss', $fullName, $email, $passwordHash, $role);

    if ($stmt->execute()) {
        $_SESSION['user_id'] = $stmt->insert_id;
        $_SESSION['user_name'] = $fullName;
        $_SESSION['user_email'] = $email;
        $_SESSION['user_role'] = $role;

        header('Location: ../pages/home.html');
        exit;
    } else {
        header('Location: ../pages/signup.html?error=server_error');
        exit;
    }
} else {
    header('Location: ../pages/signup.html');
    exit;
}
