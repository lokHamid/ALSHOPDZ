<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (use a specific origin for more security)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers

// Handle preflight requests for methods other than GET or POST
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // End the request here
}


require_once 'Product.php';

header('Content-Type: application/json');

$product = new Product();

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $result = $product->getById($id);
    echo json_encode($result);
} else {
    $result = $product->getAll();
    echo json_encode($result);
}
