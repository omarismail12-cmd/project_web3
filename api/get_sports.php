<?php
header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=sportbook', 'root', '');
$stmt = $pdo->query('SELECT id, name, icon, courts, available, price FROM sports');
$sports = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($sports);