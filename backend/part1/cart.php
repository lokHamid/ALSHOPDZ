<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS,DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

header("Content-Type: application/json");

require_once __DIR__ . '/../Database.php';
$db = new Database();
$conn = $db->connect();

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (!$input || !isset($input['cart_item_id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input - cart_item_id required"]);
        exit;
    }
    
    $cartItemId = $input['cart_item_id'];
    
    try {
        $sql = "DELETE FROM cart_items WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $success = $stmt->execute([$cartItemId]);
        
        if ($success) {
            echo json_encode(["message" => "Item deleted successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to delete item"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
    exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (!$input || !isset($input['cart_item_id']) || !isset($input['quantity'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input"]);
        exit;
    }
    
    $cartItemId = $input['cart_item_id'];
    $quantity = $input['quantity'];
    
    try {
        $sql = "UPDATE cart_items SET quantity = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $success = $stmt->execute([$quantity, $cartItemId]);
        
        if ($success) {
            echo json_encode(["message" => "Quantity updated successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to update quantity"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    $requestUri = $_SERVER['REQUEST_URI'];
    $parts = explode('/', $requestUri);
    $userId = end($parts);
    
   
    if (!is_numeric($userId)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid user_id"]);
        exit;
    }
    
    $userId = intval($userId);
    
    try {
        $sql = "SELECT 
                    ci.id AS cart_item_id,
                    ci.quantity,
                    p.name AS product_name,
                    p.image AS product_image,
                    p.brand,
                    o.price
                FROM cart_items ci
                JOIN product p ON ci.product_id = p.id
                JOIN options o ON ci.option_id = o.id
                WHERE ci.user_id = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([$userId]);
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($items);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

// Handle POST requests
$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input['product_id']) || !isset($input['option_id']) || !isset($input['user_id']) || !isset($input['quantity'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

$productId = $input['product_id'];
$optionId = $input['option_id'];
$userId = $input['user_id'];
$quantity = $input['quantity'];

try {
    // Check if item already exists
    $checkSql = "SELECT id FROM cart_items WHERE product_id = ? AND option_id = ? AND user_id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->execute([$productId, $optionId, $userId]);
    $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        http_response_code(409);
        echo json_encode(["error" => "Item already exists in cart"]);
        exit;
    }

    // Insert new item
    $sql = "INSERT INTO cart_items (product_id, option_id, user_id, quantity) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $success = $stmt->execute([$productId, $optionId, $userId, $quantity]);

    if ($success) {
        echo json_encode(["message" => "Added to cart successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to add to cart"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}