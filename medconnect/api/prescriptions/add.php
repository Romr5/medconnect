<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit();
}

include('../../config/db.php');

$appointment_id = $data->appointment_id ?? null;
$doctor_id = $data->doctor_id ?? null;
$patient_id = $data->patient_id ?? null;
$diagnosis = $data->diagnosis ?? '';
$prescription = $data->prescription ?? '';

if (!$appointment_id || !$doctor_id || !$patient_id || empty($prescription)) {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
    exit();
}

$sql = "INSERT INTO prescriptions (appointment_id, doctor_id, patient_id, diagnosis, prescription) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiiss", $appointment_id, $doctor_id, $patient_id, $diagnosis, $prescription);
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Prescription saved"]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to save",
        "error" => $stmt->error  
    ]);
}
