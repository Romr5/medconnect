<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once __DIR__ . '/../../config/db.php';

$result = $conn->query("SELECT id, name, email, phone, role, specialization FROM users");

$users = [];

while ($row = $result->fetch_assoc()) {
  $users[] = $row;
}

echo json_encode([
  "status" => "success",
  "users" => $users
]);
