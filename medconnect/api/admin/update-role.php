<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../../config/db.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !isset($data['role'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing id or role']);
    exit();
}

$id = $conn->real_escape_string($data['id']);
$role = $conn->real_escape_string($data['role']);

$query = "UPDATE users SET role = '$role' WHERE id = $id";

if ($conn->query($query) === TRUE) {
    echo json_encode(['message' => 'User role updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to update user role']);
}
