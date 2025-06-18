<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../../config/db.php';

$sql = "SELECT id, name, email, specialization FROM users WHERE role = 'doctor'";
$result = $conn->query($sql);

$doctors = [];

while ($row = $result->fetch_assoc()) {
  $doctors[] = $row;
}

echo json_encode([
  "status" => "success",
  "doctors" => $doctors
]);
