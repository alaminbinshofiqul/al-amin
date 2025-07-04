<?php
// Enable all errors
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $db = new PDO(
        "mysql:host=localhost;dbname=sociology_website",
        "socio_user",
        "sociology123",
        [
            PDO::ATTR_ERRMODE => PDO::ATTR_ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
    
    // Test simple query
    $result = $db->query("SELECT 1");
    echo "Connection successful!<br>";
    
    // Test insertion
    $stmt = $db->prepare("INSERT INTO contact_messages (name, email, subject, message) 
                         VALUES ('TEST', 'test@test.com', 'TEST', 'TEST')");
    $stmt->execute();
    echo "Insert successful! Last ID: " . $db->lastInsertId();
    
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>