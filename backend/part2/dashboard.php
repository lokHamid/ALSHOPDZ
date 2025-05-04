<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once __DIR__ . '/../Database.php';

class Dashboard {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getActiveUsersCount() {
        $query = "SELECT COUNT(*) as count FROM users WHERE status = 'active'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }

    public function getTotalProductsCount() {
        $query = "SELECT COUNT(*) as count FROM product";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }

    public function getTotalOrdersCount() {
        $query = "SELECT COUNT(*) as count FROM orders";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }

    public function getDashboardStats() {
        return [
            'active_users' => $this->getActiveUsersCount(),
            'total_products' => $this->getTotalProductsCount(),
            'total_orders' => $this->getTotalOrdersCount()
        ];
    }
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $dashboard = new Dashboard();
    $stats = $dashboard->getDashboardStats();
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $stats,
        'message' => 'Dashboard statistics retrieved successfully'
    ]);
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
?>