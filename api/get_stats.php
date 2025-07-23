<?php
header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=sportbook', 'root', '');

// For better safety, wrap in try/catch:
try {
    $totalBookings = $pdo->query('SELECT COUNT(*) FROM bookings')->fetchColumn();
    $activeCourts = $pdo->query('SELECT COUNT(*) FROM courts WHERE active = 1')->fetchColumn();
    $revenue = $pdo->query('SELECT SUM(amount) FROM payments')->fetchColumn();
    $members = $pdo->query('SELECT COUNT(*) FROM members')->fetchColumn();

    echo json_encode([
        'totalBookings' => $totalBookings,
        'activeCourts' => $activeCourts,
        'revenue' => $revenue,
        'members' => $members
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}