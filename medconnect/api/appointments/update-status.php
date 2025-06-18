<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"));

$appointment_id = $data->appointment_id ?? null;
$status = $data->status ?? null;

if (!$appointment_id || !$status) {
  echo json_encode(["status" => "error", "message" => "Missing id or status"]);
  exit;
}

$stmt = $conn->prepare("UPDATE appointments SET status = ? WHERE id = ?");
$stmt->bind_param("si", $status, $appointment_id);

if ($stmt->execute()) {
  echo json_encode(["status" => "success", "message" => "Status updated"]);
} else {
  echo json_encode(["status" => "error", "message" => "Database update failed"]);
}
