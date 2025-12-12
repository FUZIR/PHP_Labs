<?php
// server_logs.php
header("Content-Type: application/json");
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode(["status" => "error", "msg" => "No data"]);
    exit;
}

$mysqli = new mysqli("sql305.infinityfree.com", "if0_39960025", "Kirlip223223", "if0_39960025_editable_page");
//$mysqli = new mysqli("localhost", "root", "", "editable_page");
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB Error"]);
    exit;
}

function saveLog($conn, $data) {
    $serverTime = microtime(true);
    $stmt = $conn->prepare("INSERT INTO animation_logs (event_id, client_time, server_time, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $data['eventId'], $data['time'], $serverTime, $data['msg']);
    $stmt->execute();
    return $serverTime;
}

$response = [];

if (isset($input['batch']) && is_array($input['batch'])) {
    foreach ($input['batch'] as $logItem) {
        saveLog($mysqli, $logItem);
    }
    $response['status'] = 'batch_saved';
} else {
    $svTime = saveLog($mysqli, $input);
    $response['server_time'] = $svTime;
    $response['diff'] = $svTime - ($input['time'] / 1000);
}

$mysqli->close();
echo json_encode($response);
?>