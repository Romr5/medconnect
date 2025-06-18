<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../../config/db.php');

$query = "SELECT id, name, email, phone, role FROM users ORDER BY role, name";
$result = $conn->query($query);

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}
echo json_encode($users);