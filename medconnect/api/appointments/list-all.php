<?php
// ✅ CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ DB Connection
require_once __DIR__ . '/../../config/db.php';

// ✅ Fetch appointments
$query = "SELECT * FROM appointments ORDER BY appointment_date DESC";
$result = $conn->query($query);

$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}

// ✅ Response
echo json_encode([
    "status" => "success",
    "appointments" => $appointments
]);
