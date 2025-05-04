<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../Database.php';

class Product {
    private $conn;
    private $table = "product";

    public function __construct() {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getAll() {
        $sql = "SELECT 
                    p.id AS product_id,
                    p.name, p.description, p.instalment, p.category, 
                    p.brand, p.shippingfees, p.image AS main_image,
                    o.id AS option_id, o.color, o.color_name, o.version, 
                    o.price, o.quantity,
                    i.image AS option_image
                FROM product p
                LEFT JOIN options o ON o.product_id = p.id
                LEFT JOIN images i ON i.option_id = o.id
                ORDER BY p.id, o.id";
    
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        $products = [];
    
        foreach ($rows as $row) {
            $productId = $row['product_id'];
            $optionId = $row['option_id'];
    
            if (!isset($products[$productId])) {
                $products[$productId] = [
                    'id' => $productId,
                    'name' => $row['name'],
                    'description' => $row['description'],
                    'instalment' => $row['instalment'],
                    'category' => $row['category'],
                    'brand' => $row['brand'],
                    'shippingfees' => $row['shippingfees'],
                    'main_image' => $row['main_image'],
                    'options' => []
                ];
            }
    
            if ($optionId && !isset($products[$productId]['options'][$optionId])) {
                $products[$productId]['options'][$optionId] = [
                    'id' => $optionId,
                    'color' => $row['color'],
                    'color_name' => $row['color_name'],
                    'version' => $row['version'],
                    'price' => $row['price'],
                    'quantity' => $row['quantity'],
                    'images' => []
                ];
            }
    
            if ($optionId && !empty($row['option_image'])) {
                $products[$productId]['options'][$optionId]['images'][] = $row['option_image'];
            }
        }
    
        foreach ($products as &$product) {
            $product['options'] = array_values($product['options']);
        }
    
        return array_values($products);
    }

    public function getById($id) {
        $sql = "SELECT 
                    p.id AS product_id,
                    p.name, p.description, p.instalment, p.category, 
                    p.brand, p.shippingfees, p.image AS main_image,
                    o.id AS option_id, o.color, o.color_name, o.version, 
                    o.price, o.quantity,
                    i.image AS option_image
                FROM product p
                LEFT JOIN options o ON o.product_id = p.id
                LEFT JOIN images i ON i.option_id = o.id
                WHERE p.id = ?
                ORDER BY o.id";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if (empty($rows)) return null;
        
        $product = [
            'id' => $rows[0]['product_id'],
            'name' => $rows[0]['name'],
            'description' => $rows[0]['description'],
            'instalment' => $rows[0]['instalment'],
            'category' => $rows[0]['category'],
            'brand' => $rows[0]['brand'],
            'shippingfees' => $rows[0]['shippingfees'],
            'main_image' => $rows[0]['main_image'],
            'options' => []
        ];
        
        foreach ($rows as $row) {
            if ($row['option_id'] && !isset($product['options'][$row['option_id']])) {
                $product['options'][$row['option_id']] = [
                    'id' => $row['option_id'],
                    'color' => $row['color'],
                    'color_name' => $row['color_name'],
                    'version' => $row['version'],
                    'price' => $row['price'],
                    'quantity' => $row['quantity'],
                    'images' => []
                ];
                
                if (!empty($row['option_image'])) {
                    $product['options'][$row['option_id']]['images'][] = $row['option_image'];
                }
            } elseif ($row['option_id']) {
                if (!empty($row['option_image'])) {
                    $product['options'][$row['option_id']]['images'][] = $row['option_image'];
                }
            }
        }
        
        $product['options'] = array_values($product['options']);
        return $product;
    }

    public function create($data) {
        $sql = "INSERT INTO {$this->table} 
                (name, description, instalment, category, brand, shippingfees, image)
                VALUES (:name, :description, :instalment, :category, :brand, :shippingfees, :image)";
        
        $stmt = $this->conn->prepare($sql);
        
        $data['name'] = htmlspecialchars(strip_tags($data['name']));
        $data['description'] = htmlspecialchars(strip_tags($data['description']));
        $data['instalment'] = htmlspecialchars(strip_tags($data['instalment']));
        $data['category'] = htmlspecialchars(strip_tags($data['category']));
        $data['brand'] = htmlspecialchars(strip_tags($data['brand']));
        $data['shippingfees'] = htmlspecialchars(strip_tags($data['shippingfees']));
        $data['image'] = htmlspecialchars(strip_tags($data['image']));
        
        if($stmt->execute($data)) {
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function update($id, $data) {
        $sql = "UPDATE {$this->table} 
                SET 
                    name = :name,
                    description = :description,
                    instalment = :instalment,
                    category = :category,
                    brand = :brand,
                    shippingfees = :shippingfees,
                    image = :image
                WHERE id = :id";
        
        $stmt = $this->conn->prepare($sql);

        $data['id'] = $id;
        $data['name'] = htmlspecialchars(strip_tags($data['name']));
        $data['description'] = htmlspecialchars(strip_tags($data['description']));
        $data['instalment'] = htmlspecialchars(strip_tags($data['instalment']));
        $data['category'] = htmlspecialchars(strip_tags($data['category']));
        $data['brand'] = htmlspecialchars(strip_tags($data['brand']));
        $data['shippingfees'] = htmlspecialchars(strip_tags($data['shippingfees']));
        $data['image'] = htmlspecialchars(strip_tags($data['image']));
        
        return $stmt->execute($data);
    }

    public function deleteById($id) {
        $sql = "DELETE FROM options WHERE product_id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        
        $sql = "DELETE FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $id = htmlspecialchars(strip_tags($id));
        
        return $stmt->execute([$id]) && $stmt->rowCount() > 0;
    }
}

// controller section 

$product = new Product();
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch($method) {
    case 'GET':
        if(isset($_GET['id'])) {
            $id = $_GET['id'];
            $result = $product->getById($id);
            if($result) {
                http_response_code(200);
                echo json_encode($result);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Product not found']);
            }
        } else {
            $result = $product->getAll();
            http_response_code(200);
            echo json_encode($result);
        }
        break;
        
    case 'POST':
        if(!empty($input)) {
            $productId = $product->create($input);
            if($productId) {
                http_response_code(201);
                echo json_encode([
                    'message' => 'Product created',
                    'id' => $productId
                ]);
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'Product creation failed']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Invalid input']);
        }
        break;
        
    case 'PUT':
        if(isset($_GET['id']) && !empty($input)) {
            $id = $_GET['id'];
            if($product->update($id, $input)) {
                http_response_code(200);
                echo json_encode(['message' => 'Product updated']);
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'Product update failed']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Invalid input or missing ID']);
        }
        break;
        
    case 'DELETE':
        if(isset($_GET['id'])) {
            $id = $_GET['id'];
            if($product->deleteById($id)) {
                http_response_code(200);
                echo json_encode(['message' => 'Product deleted']);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Product not found or delete failed']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Missing ID parameter']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed']);
        break;
}
?>