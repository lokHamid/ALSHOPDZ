<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

require_once __DIR__ . '/../Database.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = isset($_GET['request']) ? $_GET['request'] : '';

$order = new Order();

switch($method) {
    case 'GET':
        if(isset($_GET['id'])) {
            $order->id = $_GET['id'];
            
            if($order->read_single()) {
                http_response_code(200);
                echo json_encode([
                    'id' => $order->id,
                    'option_id' => $order->option_id,
                    'user_id' => $order->user_id,
                    'username' => $order->username,
                    'image' => $order->image,
                    'descrip' => $order->descrip,
                    'date_order' => $order->date_order,
                    'quantity' => $order->quantity,
                    'price' => $order->price,
                    'statu' => $order->statu,
                    'color' => $order->color,
                    'version' => $order->version
                ]);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Order not found']);
            }
        } else {
            $stmt = $order->read();
            $orders_arr = array();
            

            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $order_item = array(
                    'id' => $row['id'],
                    'option_id' => $row['option_id'],
                    'user_id' => $row['user_id'],
                    'username' => $row['username'],
                    'image' => $row['image'],
                    'descrip' => $row['descrip'],
                    'date_order' => $row['date_order'],
                    'quantity' => $row['quantity'],
                    'price' => $row['price'],
                    'statu' => $row['statu'],

                    'color' => $row['color'],
                    'version' => $row['version']
                );
                
                array_push($orders_arr, $order_item);
            }            
            http_response_code(200);
            echo json_encode($orders_arr);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed']);
        break;
}

class Order {
    private $conn;
    private $table = 'orders';
    public $id;
    public $option_id;
    public $user_id;
    public $username;
    public $image;
    public $descrip;
    public $date_order;
    public $quantity;
    public $price;
    public $statu;
    // Added missing properties
    public $color;
    public $version;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' 
                  SET 
                    option_id = :option_id,
                    user_id = :user_id,
                    quantity = :quantity,
                    price = :price,
                    statu = :statu';
    
        $stmt = $this->conn->prepare($query);
    
        $this->option_id = htmlspecialchars(strip_tags($this->option_id));
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->quantity = htmlspecialchars(strip_tags($this->quantity));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->statu = htmlspecialchars(strip_tags($this->statu));
    
        $stmt->bindParam(':option_id', $this->option_id);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':statu', $this->statu);
    
        if($stmt->execute()) {
            return true;
        }
    
        printf("Error: %s.\n", $stmt->error);
        return false;
    }
    
    public function read() {
        $query = 'SELECT 
                    o.id,
                    o.option_id,
                    o.user_id,
                    u.username,
                    p.image,
                    p.description as descrip,
                    o.date_order,
                    o.quantity,
                    o.price,
                    o.statu,
                    opt.color,
                    opt.version
                  FROM ' . $this->table . ' o
                  LEFT JOIN options opt ON o.option_id = opt.id
                  LEFT JOIN product p ON opt.product_id = p.id
                  LEFT JOIN users u ON o.user_id = u.id
                  ORDER BY o.date_order DESC';
    
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    
    public function read_single() {
        $query = 'SELECT 
                    o.id,
                    o.option_id,
                    o.user_id,
                    u.username,
                    p.image,
                    p.description as descrip,
                    o.date_order,
                    o.quantity,
                    o.price,
                    o.statu,
                    opt.color,
                    opt.version
                  FROM ' . $this->table . ' o
                  LEFT JOIN options opt ON o.option_id = opt.id
                  LEFT JOIN product p ON opt.product_id = p.id
                  LEFT JOIN users u ON o.user_id = u.id
                  WHERE o.id = ?
                  LIMIT 0,1';
    
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
    
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if($row) {
            $this->option_id = $row['option_id'];
            $this->user_id = $row['user_id'];
            $this->username = $row['username'];
            $this->image = $row['image'];
            $this->descrip = $row['descrip'];
            $this->date_order = $row['date_order'];
            $this->quantity = $row['quantity'];
            $this->price = $row['price'];
            $this->statu = $row['statu'];
            $this->color = $row['color'];
            $this->version = $row['version'];
            return true;
        }
    
        return false;
    }

    public function update() {
        $query = 'UPDATE ' . $this->table . ' 
                  SET 
                    option_id = :option_id,
                    quantity = :quantity,
                    price = :price,
                    statu = :statu
                  WHERE 
                    id = :id';

        $stmt = $this->conn->prepare($query);

        $this->option_id = htmlspecialchars(strip_tags($this->option_id));
        $this->quantity = htmlspecialchars(strip_tags($this->quantity));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->statu = htmlspecialchars(strip_tags($this->statu));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':option_id', $this->option_id);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':statu', $this->statu);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }

        printf("Error: %s.\n", $stmt->error);
        return false;
    }
    
    public function delete() {
        $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }

        printf("Error: %s.\n", $stmt->error);
        return false;
    }
}
?>