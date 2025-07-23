<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// اتصال بقاعدة البيانات
require_once '../db.php'; // غيّر المسار إذا لزم

$sql = "SELECT * FROM events";
$result = $conn->query($sql);

$events = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // تأكد من أن الحقول يمكن فك تشفيرها كـ JSON
        $row['requirements'] = json_decode($row['requirements'], true) ?? [];
        $row['prizes'] = json_decode($row['prizes'], true) ?? [];

        // أضف الحدث إلى القائمة
        $events[] = $row;
    }
}

// إخراج البيانات كـ JSON
echo json_encode($events);

// تأكد من إغلاق الاتصال (اختياري إن كنت تستخدم mysqli procedural)
$conn->close();
?>
