<?php

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Autoload dependencies (if using Composer)
require_once __DIR__ . '/../vendor/autoload.php';

// Define constants
define('BASE_PATH', realpath(__DIR__ . '/../'));

// Include necessary files
require_once BASE_PATH . '/config/config.php';
require_once BASE_PATH . '/routes/web.php';

// Basic routing logic
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Example: Simple routing
if ($requestUri === '/' && $requestMethod === 'GET') {
    echo "Welcome to ALSHOPDZ!";
} else {
    http_response_code(404);
    echo "404 Not Found";
}