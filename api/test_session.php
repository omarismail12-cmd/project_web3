<?php
session_start();
require_once '../db.php';

header('Content-Type: application/json');

try {
    // Check session status
    $sessionData = [
        'session_id' => session_id(),
        'user_id' => $_SESSION['user_id'] ?? null,
        'role' => $_SESSION['role'] ?? null,
        'all_session_data' => $_SESSION
    ];
    
    $userExists = false;
    $userData = null;
    
    // If user_id exists in session, check if user exists in database
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $userQuery = "SELECT id, username, email, role FROM users WHERE id = ?";
        $stmt = $conn->prepare($userQuery);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $userExists = true;
            $userData = $result->fetch_assoc();
        }
    }
    
    echo json_encode([
        'success' => true,
        'session_data' => $sessionData,
        'user_exists_in_db' => $userExists,
        'user_data' => $userData
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

$conn->close();
?>
