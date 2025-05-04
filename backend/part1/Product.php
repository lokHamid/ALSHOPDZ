<?php
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
                    p.name, p.description, p.instalment, p.category, p.brand, p.shippingfees, p.image AS main_image,
                    o.id AS option_id, o.color, o.color_name, o.version, o.price, o.quantity,
                    i.image AS option_image
                FROM product p
                LEFT JOIN options o ON o.product_id = p.id
                LEFT JOIN images i ON i.option_id = o.id";
    
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
                    'desc' => $row['description'],
                    'instalment' => $row['instalment'],
                    'category' => $row['category'],
                    'brand' => $row['brand'],
                    'shippingfees' => $row['shippingfees'],
                    'imgSrc' => $row['main_image'],
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
        $sql = "SELECT * FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $sql = "INSERT INTO {$this->table} (name, description, instalment, category, brand, shippingfees, image)
                VALUES (:name, :description, :instalment, :category, :brand, :shippingfees, :image)";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute($data);
    }
}
?>
