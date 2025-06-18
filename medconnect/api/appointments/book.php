<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include('../../config/db.php');

// Read and decode JSON input
$data = json_decode(file_get_contents("php://input"));

// Validate input
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit;
}

$patient_id = $data->patient_id ?? null;
$doctor_id = $data->doctor_id ?? null;
$appointment_date = $data->appointment_date ?? '';
$appointment_time = $data->appointment_time ?? '';

if (!$patient_id || !$doctor_id || !$appointment_date || !$appointment_time) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

// Insert appointment with default 'pending' status
$query = "INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status)
          VALUES (?, ?, ?, ?, 'pending')";

$stmt = $conn->prepare($query);
$stmt->bind_param("iiss", $patient_id, $doctor_id, $appointment_date, $appointment_time);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Appointment booked successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Booking failed"]);
}
