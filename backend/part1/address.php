<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once(__DIR__ . '/../Database.php');

$db = new Database();
$conn = $db->connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Preflight response for CORS
}

// Handle GET: Fetch address by user_id
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['user_id']) || !is_numeric($_GET['user_id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid or missing user_id"]);
        exit;
    }

    $user_id = intval($_GET['user_id']);

    try {
        $stmt = $conn->prepare("SELECT * FROM addresses WHERE user_id = ?");
        $stmt->execute([$user_id]);
        $address = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($address) {
            echo json_encode($address);
        } else {
            echo json_encode(["message" => "No address found"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

// Handle POST: Create a new address
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input ||
        !isset($input['user_id']) ||
        !isset($input['full_name']) ||
        !isset($input['phone']) ||
        !isset($input['street']) ||
        !isset($input['apt']) ||
        !isset($input['city']) ||
        !isset($input['state']) ||
        !isset($input['country']) ||
        !isset($input['zip'])) {

        http_response_code(400);
        echo json_encode(["error" => "Invalid input"]);
        exit;
    }

    try {
        $sql = "INSERT INTO addresses (user_id, full_name, phone, street, apt, city, state, country, zip)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $success = $stmt->execute([
            $input['user_id'],
            $input['full_name'],
            $input['phone'],
            $input['street'],
            $input['apt'],
            $input['city'],
            $input['state'],
            $input['country'],
            $input['zip']
        ]);

        if ($success) {
            echo json_encode(["message" => "Address created"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to add address"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

// Handle PUT: Update address by user_id
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input ||
        !isset($input['user_id']) ||
        !isset($input['full_name']) ||
        !isset($input['phone']) ||
        !isset($input['street']) ||
        !isset($input['apt']) ||
        !isset($input['city']) ||
        !isset($input['state']) ||
        !isset($input['country']) ||
        !isset($input['zip'])) {

        http_response_code(400);
        echo json_encode(["error" => "Invalid input"]);
        exit;
    }

    try {
        $stmt = $conn->prepare("UPDATE addresses SET full_name = ?, phone = ?, street = ?, apt = ?, city = ?, state = ?, country = ?, zip = ? WHERE user_id = ?");
        $success = $stmt->execute([
            $input['full_name'],
            $input['phone'],
            $input['street'],
            $input['apt'],
            $input['city'],
            $input['state'],
            $input['country'],
            $input['zip'],
            $input['user_id']
        ]);

        if ($success) {
            echo json_encode(["message" => "Address updated"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to update address"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

// Default: Invalid method
http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
