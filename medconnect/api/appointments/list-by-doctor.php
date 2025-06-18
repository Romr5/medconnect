<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->doctor_id)) {
    echo json_encode(["status" => "error", "message" => "Missing doctor_id"]);
    exit();
}

$doctor_id = $data->doctor_id;

include('../../config/db.php');

$query = "SELECT a.*, u.name AS patient_name 
          FROM appointments a
          JOIN users u ON a.patient_id = u.id
          WHERE a.doctor_id = ?
          ORDER BY a.appointment_date, a.appointment_time";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $doctor_id);
$stmt->execute();
$result = $stmt->get_result();

$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}
echo json_encode($appointments);
