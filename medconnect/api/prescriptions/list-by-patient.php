<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->patient_id)) {
    echo json_encode(["status" => "error", "message" => "Missing patient_id"]);
    exit();
}

include('../../config/db.php');

$patient_id = $data->patient_id;

$query = "SELECT p.*, d.name AS doctor_name 
          FROM prescriptions p
          JOIN users d ON p.doctor_id = d.id
          WHERE p.patient_id = ?
          ORDER BY p.created_at DESC";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $patient_id);
$stmt->execute();
$result = $stmt->get_result();

$prescriptions = [];
while ($row = $result->fetch_assoc()) {
    $prescriptions[] = $row;
}
echo json_encode($prescriptions);
