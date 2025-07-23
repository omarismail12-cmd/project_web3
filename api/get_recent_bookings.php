<?php
header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=sportbook', 'root', '');
$stmt = $pdo->query('SELECT id, sport, court, date, time, status FROM bookings ORDER BY date DESC LIMIT 5');
$bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($bookings);