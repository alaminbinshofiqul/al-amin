<?php
// Enable complete error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__.'/sociology_errors.log');

// Ensure clean output
while (ob_get_level()) ob_end_clean();

// Set JSON header
header('Content-Type: application/json');

// Database configuration
$config = [
    'host' => 'localhost',
    'dbname' => 'sociology_website',
    'user' => 'socio_user', // Try 'root' if connection fails
    'pass' => 'sociology123' // Try '' if using root
];

$response = ['success' => false, 'message' => ''];

try {
    // Connect to database
    $db = new PDO(
        "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4",
        $config['user'],
        $config['pass'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );

    // Verify POST request
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Only POST requests allowed");
    }

    // Validate required fields
    $required = ['name', 'email', 'subject', 'message'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Sanitize inputs
    $name = substr(trim($_POST['name']), 0, 100);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject = substr(trim($_POST['subject']), 0, 200);
    $message = substr(trim($_POST['message']), 0, 5000);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format");
    }

    // Insert into database
    $stmt = $db->prepare("INSERT INTO contact_messages 
                         (name, email, subject, message) 
                         VALUES (:name, :email, :subject, :message)");
    
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':subject', $subject);
    $stmt->bindParam(':message', $message);
    
    if ($stmt->execute()) {
        $response = [
            'success' => true,
            'message' => 'Thank you! Your message has been sent.',
            'insert_id' => $db->lastInsertId()
        ];
    } else {
        throw new Exception("Failed to save to database");
    }

} catch(PDOException $e) {
    $response['message'] = "Database error: Code {$e->getCode()} - {$e->getMessage()}";
    error_log("DB Error: ".$e->getMessage());
} catch(Exception $e) {
    $response['message'] = $e->getMessage();
    error_log("Error: ".$e->getMessage());
}

// Final output
echo json_encode($response);
exit;
?>