<?php
// ✅ CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

// ✅ DB connection
require_once __DIR__ . '/../../config/db.php';

// ✅ Parse input
$data = json_decode(file_get_contents("php://input"));

// ✅ Extract fields
$name = $data->name ?? '';
$email = $data->email ?? '';
$phone = $data->phone ?? '';
$address = $data->address ?? '';
$age = $data->age ?? '';
$gender = $data->gender ?? '';
$role = $data->role ?? 'patient';
$op_number = $data->op_number ?? '';
$password = $data->password ?? null;
$specialization = $data->specialization ?? null; // only for doctors

// ✅ Validate required fields
if (!$name || !$phone || !$role || !$op_number) {
  echo json_encode(["status" => "error", "message" => "Required fields are missing"]);
  exit;
}

// ✅ Check if user already exists
if ($role === 'patient') {
  $stmt = $conn->prepare("SELECT id FROM users WHERE op_number = ?");
  $stmt->bind_param("s", $op_number);
} else {
  $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
}
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
  echo json_encode(["status" => "error", "message" => "User already exists"]);
  exit;
}

// ✅ Hash password for admin/doctor
$hashedPassword = null;
if (in_array($role, ['admin', 'doctor']) && !empty($password)) {
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
}

// ✅ Insert user
$sql = "INSERT INTO users 
  (name, email, phone, address, age, gender, role, op_number, password, specialization)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
  "ssssisssss",
  $name,
  $email,
  $phone,
  $address,
  $age,
  $gender,
  $role,
  $op_number,
  $hashedPassword,
  $specialization
);

// ✅ Execute insert
if ($stmt->execute()) {
  echo json_encode(["status" => "success", "message" => "User registered successfully"]);
} else {
  echo json_encode(["status" => "error", "message" => "Registration failed"]);
}
