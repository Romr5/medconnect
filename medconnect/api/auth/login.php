<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

require_once __DIR__ . '/../../config/db.php'; // ✅ ADD THIS LINE

$data = json_decode(file_get_contents("php://input"));

if (isset($data->op_number)) {
    // ✅ Patient login
    $op_number = $data->op_number;

    $stmt = $conn->prepare("SELECT * FROM users WHERE op_number = ? AND role = 'patient'");
    $stmt->bind_param("s", $op_number);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        unset($user['password']);
        echo json_encode(["status" => "success", "user" => $user]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid OP number"]);
    }
} elseif (isset($data->email) && isset($data->password)) {
    // ✅ Admin/Doctor login
    $email = $data->email;
    $password = $data->password;

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND role IN ('admin', 'doctor')");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        unset($user['password']);
        echo json_encode(["status" => "success", "user" => $user]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing login credentials"]);
}
