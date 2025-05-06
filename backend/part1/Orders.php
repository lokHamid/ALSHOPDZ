<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

header("Content-Type: application/json");

require_once(__DIR__ . '/../Database.php');

$db = new Database();
$conn = $db->connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input ||
        !isset($input['user_id']) ||
        !isset($input['option_id']) ||
        !isset($input['quantity']) ||
        !isset($input['price'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input"]);
        exit;
    }

    $user_id = intval($input['user_id']);
    $option_id = intval($input['option_id']);
    $quantity = intval($input['quantity']);
    $price = floatval($input['price']);

    try {
        $sql = "INSERT INTO orders (user_id, option_id, quantity, price) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$user_id, $option_id, $quantity, $price]);

        echo json_encode(["message" => "Order placed successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
