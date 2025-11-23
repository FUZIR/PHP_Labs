<?php
header("Content-Type: application/json");
$method = $_SERVER['REQUEST_METHOD'];

//$mysqli = new mysqli("sql305.infinityfree.com", "if0_39960025", "Kirlip223223", "if0_39960025_editable_page");
$mysqli = new mysqli("localhost", "root", "", "editable_page");
$mysqli->set_charset("utf8mb4");

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['data'])) {
        $jsonData = json_encode($input['data'], JSON_UNESCAPED_UNICODE);

        $stmt = $mysqli->prepare("UPDATE variant_data SET content_json = ? WHERE id = 1");
        $stmt->bind_param("s", $jsonData);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $stmt->error]);
        }
        $stmt->close();
    }
} elseif ($method === 'GET') {
    $result = $mysqli->query("SELECT content_json FROM variant_data WHERE id = 1");
    if ($row = $result->fetch_assoc()) {
        echo $row['content_json'];
    } else {
        echo json_encode([]);
    }
}

$mysqli->close();
?>