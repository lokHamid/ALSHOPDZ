# Tech E-Commerce Web Application

This is a full-stack e-commerce web application focused on selling technology products such as phones, tablets, PCs, and other electronic devices. The project is built using HTML, CSS, JavaScript, and PHP, and includes both a customer-facing interface and an admin dashboard.

## Features

### User Features
- User authentication (login and registration)
- Browse tech products
- Product filtering by category and other criteria
- Shopping cart functionality
- Order placement and checkout
- View order history
- Responsive user interface

### Admin Dashboard
- Admin authentication
- Product management (add, edit, delete products)
- User management
- View and manage customer orders
- Track sales, revenue, and profits
- View overall system statistics

## Technologies Used
- HTML
- CSS
- JavaScript
- PHP
- MySQL

## Project Structure

/admin  
- dashboard.php  
- products.php  
- users.php  
- sales.php  

/assets  
- css  
- js  
- images  

/auth  
- login.php  
- register.php  

/cart  
/checkout  
/config  
index.php  

## Installation

1. Clone the repository:
git clone https://github.com/lokHamid/ALSHOPDZ.git

2. Move the project to your local server directory:
- XAMPP: `htdocs`
- WAMP: `www`

3. Create a database and execute the SQL file using phpMyAdmin.

4. Configure the database connection in the configuration file:
```php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "ecommerce_db";
