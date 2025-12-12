<?php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

$page = isset($data["page"]) ? $data["page"] : "";
$key = isset($data["element_key"]) ? $data["element_key"] : "";
$text = isset($data["text_content"]) ? $data["text_content"] : "";

if (empty($page) || empty($key)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing page or element_key"]);
    exit;
}

$mysqli = new mysqli("sql305.infinityfree.com", "if0_39960025", "Kirlip223223", "if0_39960025_editable_page");
//$mysqli = new mysqli("localhost", "root", "", "editable_page");
$mysqli->set_charset("utf8mb4");
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$stmt = $mysqli->prepare("
  INSERT INTO elements (page, element_key, text_content)
  VALUES (?, ?, ?)
  ON DUPLICATE KEY UPDATE text_content = VALUES(text_content)
");
$stmt->bind_param("sss", $page, $key, $text);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => $stmt->error]);
    exit;
}

$stmt->close();
$mysqli->close();

echo json_encode(["success" => true]);
