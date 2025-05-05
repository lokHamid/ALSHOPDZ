<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../Database.php';

class User {
    private $conn;
    private $table = "users";

    public function __construct() {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getAll() {
        $sql = "SELECT id, username, email, date_created, status, role FROM {$this->table}";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $sql = "SELECT id, username, email, date_created, status, role FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
            return false;
        }

        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        $sql = "INSERT INTO {$this->table} 
                (username, email, password, status, role)
                VALUES (:username, :email, :password, :status, :role)";
        
        $stmt = $this->conn->prepare($sql);
        
        $status = $data['status'] ?? 'active';
        $role = $data['role'] ?? 'user';

        $username = htmlspecialchars(strip_tags($data['username']));
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);

        return $stmt->execute([
            ':username' => $username,
            ':email' => $email,
            ':password' => $hashedPassword,
            ':status' => $status,
            ':role' => $role
        ]);
    }

    public function update($id, $data) {
        $sql = "UPDATE {$this->table} 
                SET 
                    username = :username,
                    email = :email,
                    status = :status,
                    role = :role
                WHERE id = :id";
        
        $stmt = $this->conn->prepare($sql);
        
        $username = htmlspecialchars(strip_tags($data['username']));
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        $status = htmlspecialchars(strip_tags($data['status']));
        $role = htmlspecialchars(strip_tags($data['role']));

        return $stmt->execute([
            ':id' => $id,
            ':username' => $username,
            ':email' => $email,
            ':status' => $status,
            ':role' => $role
        ]);
    }

    public function delete($id) {
        $sql = "DELETE FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([$id]);
    }

    public function getFullnameById($id){
        $sql = "SELECT username FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function login($email, $password) {
        $sql = "SELECT * FROM {$this->table} WHERE email = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']);
            return $user;
        }
        return false;
    }

    public function changePassword($id, $currentPassword, $newPassword) {
        $sql = "SELECT password FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($currentPassword, $user['password'])) {
            return false;
        }

        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $sql = "UPDATE {$this->table} SET password = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([$hashedPassword, $id]);
    }
}

$user = new User();
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$id = isset($_GET['id']) ? $_GET['id'] : null;

if (isset($_GET['action']) && $_GET['action'] == 'login' && $method == 'POST') {
    if (!empty($input['email']) && !empty($input['password'])) {
        $loggedInUser = $user->login($input['email'], $input['password']);
        if ($loggedInUser) {
            http_response_code(200);
            echo json_encode($loggedInUser);
        } else {
            http_response_code(401);
            echo json_encode(['message' => 'Invalid credentials']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Email and password required']);
    }
    exit;
}

if (isset($_GET['action']) && $_GET['action'] == 'change-password' && $method == 'PUT') {
    if ($id && !empty($input['currentPassword']) && !empty($input['newPassword'])) {
        if ($user->changePassword($id, $input['currentPassword'], $input['newPassword'])) {
            http_response_code(200);
            echo json_encode(['message' => 'Password changed successfully']);
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Password change failed']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid request']);
    }
    exit;
}

switch($method) {
    case 'GET':
        if ($id) {
            $result = $user->getById($id);
            if ($result) {
                http_response_code(200);
                echo json_encode($result);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'User not found']);
            }
        } else {
            $result = $user->getAll();
            http_response_code(200);
            echo json_encode($result);
        }
        break;
        
    case 'POST':
        if (!empty($input)) {
            if ($user->create($input)) {
                http_response_code(201);
                echo json_encode(['message' => 'User created']);
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'User creation failed']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Invalid input']);
        }
        break;
        
    case 'PUT':
        if ($id && !empty($input)) {
            if ($user->update($id, $input)) {
                http_response_code(200);
                echo json_encode(['message' => 'User updated']);
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'User update failed']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Invalid input or missing ID']);
        }
        break;
        
    case 'DELETE':
        if ($id) {
            if ($user->delete($id)) {
                http_response_code(200);
                echo json_encode(['message' => 'User deleted']);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'User not found or delete failed']);
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