<?php
header("Content-Type: application/json");

$page = basename($_GET["page"] ?? "index.php");

$mysqli = new mysqli("localhost", "root", "", "editable_page");
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$stmt = $mysqli->prepare("SELECT element_key, text_content FROM elements WHERE page = ?");
$stmt->bind_param("s", $page);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[$row["element_key"]] = $row["text_content"];
}

echo json_encode($data);
