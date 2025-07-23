<?php
session_start();
require '../db.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'owner') {
    echo json_encode(['error' => 'Access denied']);
    exit;
}

$owner_id = $_SESSION['user_id'];

$sql = "
    SELECT b.booking_date, b.start_time, b.status, f.name AS court_name, f.sport
    FROM bookings b
    INNER JOIN facilities f ON b.facility_id = f.id
    WHERE f.owner_id = ?
    ORDER BY b.booking_date DESC, b.start_time DESC
    LIMIT 5
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $owner_id);
$stmt->execute();
$result = $stmt->get_result();

$bookings = [];

while ($row = $result->fetch_assoc()) {
    $bookings[] = [
        'sport' => ucfirst($row['sport']),
        'court' => $row['court_name'],
        'date' => $row['booking_date'],
        'time' => substr($row['start_time'], 0, 5), // hh:mm
        'status' => ucfirst($row['status'])
    ];
}

echo json_encode($bookings);