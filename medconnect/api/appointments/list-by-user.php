<?php
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get raw input
$content = file_get_contents("php://input");
if (!$content) {
    echo json_encode(["status" => "error", "message" => "No input data received"]);
    exit();
}

$data = json_decode($content);

if (!$data || !isset($data->patient_id)) {
    echo json_encode(["status" => "error", "message" => "Invalid or missing patient_id"]);
    exit();
}

$patient_id = $data->patient_id;

include('../../config/db.php');

$query = "SELECT a.*, u.name AS doctor_name 
          FROM appointments a
          JOIN users u ON a.doctor_id = u.id
          WHERE a.patient_id = ?
          ORDER BY a.appointment_date, a.appointment_time";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $patient_id);
$stmt->execute();
$result = $stmt->get_result();

$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}
echo json_encode($appointments);
