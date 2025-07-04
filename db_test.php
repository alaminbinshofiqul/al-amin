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
    
    // Test insertion
    $stmt = $db->prepare("INSERT INTO contact_messages (name, email, subject, message) 
                         VALUES ('Test', 'test@test.com', 'Test', 'Test')");
    $stmt->execute();
    
    echo "Database connection and insertion WORKING! Last insert ID: " . $db->lastInsertId();
    
} catch(PDOException $e) {
    die("Database ERROR: " . $e->getMessage());
}
?>