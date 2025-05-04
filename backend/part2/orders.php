<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/../Database.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = isset($_GET['request']) ? $_GET['request'] : '';

$order = new Order();

$id = isset($_GET['id']) ? $_GET['id'] : die();

switch($method) {
    case 'GET':
        if($id) {
            $order->id = $id;
            
            if($order->read_single()) {
                http_response_code(200);
                echo json_encode([
                    'id' => $order->id,
                    'option_id' => $order->option_id,
                    'date_order' => $order->date_order,
                    'quantity' => $order->quantity,
                    'price' => $order->price,
                    'statu' => $order->statu
                ]);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Order not found']);
            }
        } else {
            $stmt = $order->read();
            $orders_arr = array();
            
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                
                $order_item = array(
                    'id' => $id,
                    'option_id' => $option_id,
                    'option_name' => $option_name,
                    'date_order' => $date_order,
                    'quantity' => $quantity,
                    'price' => $price,
                    'statu' => $statu
                );
                
                array_push($orders_arr, $order_item);
            }
            
            http_response_code(200);
            echo json_encode($orders_arr);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(
            !empty($data->option_id) &&
            !empty($data->quantity) &&
            !empty($data->price)
        ) {
            $order->option_id = $data->option_id;
            $order->quantity = $data->quantity;
            $order->price = $data->price;
            $order->statu = $data->statu ?? 'pending';
            
            if($order->create()) {
                http_response_code(201);
                echo json_encode(['message' => 'Order created']);
            } else {
                http_response_code(503);
                echo json_encode(['message' => 'Order not created']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Incomplete data']);
        }
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        
        $order->id = $id;
        
        if($order->read_single()) {
            $order->option_id = $data->option_id ?? $order->option_id;
            $order->quantity = $data->quantity ?? $order->quantity;
            $order->price = $data->price ?? $order->price;
            $order->statu = $data->statu ?? $order->statu;
            
            if($order->update()) {
                http_response_code(200);
                echo json_encode(['message' => 'Order updated']);
            } else {
                http_response_code(503);
                echo json_encode(['message' => 'Order not updated']);
            }
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Order not found']);
        }
        break;
        
    case 'DELETE':
        $order->id = $id;
        
        if($order->delete()) {
            http_response_code(200);
            echo json_encode(['message' => 'Order deleted']);
        } else {
            http_response_code(503);
            echo json_encode(['message' => 'Order not deleted']);
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
    public $date_order;
    public $quantity;
    public $price;
    public $statu;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' 
                  SET 
                    option_id = :option_id,
                    quantity = :quantity,
                    price = :price,
                    statu = :statu';

        $stmt = $this->conn->prepare($query);

        $this->option_id = htmlspecialchars(strip_tags($this->option_id));
        $this->quantity = htmlspecialchars(strip_tags($this->quantity));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->statu = htmlspecialchars(strip_tags($this->statu));

        $stmt->bindParam(':option_id', $this->option_id);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':statu', $this->statu);

        if($stmt->execute()) {
            return true;
        }

        printf("Error: %s.\n", $stmt->error);
        return false;
    }

    /*lire tous les commandes */

    public function read() {
        $query = 'SELECT 
                    o.id,
                    o.option_id,
                    o.date_order,
                    o.quantity,
                    o.price,
                    o.statu,
                    opt.name as option_name
                  FROM 
                    ' . $this->table . ' o
                  LEFT JOIN
                    options opt ON o.option_id = opt.id
                  ORDER BY
                    o.date_order DESC';

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    /*lire une seule commande */

    public function read_single() {
        $query = 'SELECT 
                    o.id,
                    o.option_id,
                    o.date_order,
                    o.quantity,
                    o.price,
                    o.statu,
                    opt.name as option_name
                  FROM 
                    ' . $this->table . ' o
                  LEFT JOIN
                    options opt ON o.option_id = opt.id
                  WHERE 
                    o.id = ?
                  LIMIT 0,1';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->option_id = $row['option_id'];
            $this->date_order = $row['date_order'];
            $this->quantity = $row['quantity'];
            $this->price = $row['price'];
            $this->statu = $row['statu'];
            return true;
        }

        return false;
    }

    /*mise a jour d'une commande */

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



    /* suppr commande */
    
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