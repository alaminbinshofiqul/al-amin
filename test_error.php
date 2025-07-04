<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Test database connection
try {
    $db = new PDO("mysql:host=localhost;dbname=chemistry_website", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ATTR_ERRMODE_EXCEPTION);
    echo "Database connected successfully!";
} catch(PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>