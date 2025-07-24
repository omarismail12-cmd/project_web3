<?php
session_start();
require_once '../db.php'; // Your DB connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$email || !$password) {
        header('Location: ../pages/signin.html?error=missing_fields');
        exit;
    }

    // Prepare and execute query
    $stmt = $conn->prepare('SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($user = $result->fetch_assoc()) {
        // Verify password hash
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_role'] = $user['role'];

            // Redirect based on role
            if ($user['role'] === 'owner' || $user['role'] === 'admin') {
                header('Location: ../pages/dashboard.html');
            } else {
                header('Location: ../pages/home.html');
            }
            exit;
        }
    }

    // If no user found or password invalid
    header('Location: ../pages/signin.html?error=invalid_credentials');
    exit;
} else {
    header('Location: ../pages/signin.html');
    exit;
}
