<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Include database connection
require_once __DIR__ . '/../../config/db.php';

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID is required']);
    exit();
}

$userId = intval($data['id']);

// Use the $conn from db.php
if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to prepare statement']);
    exit();
}

$stmt->bind_param("i", $userId);

if ($stmt->execute()) {
    echo json_encode(['message' => 'User deleted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete user']);
}

$stmt->close();
$conn->close();
?>
