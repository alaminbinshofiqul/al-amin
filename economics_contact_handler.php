<?php
// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__.'/economics_errors.log');

// Clear output buffers
while (ob_get_level()) ob_end_clean();

// Set JSON header
header('Content-Type: application/json');

// Database configuration with fallback
$db_config = [
    'host' => 'localhost',
    'dbname' => 'economics_website',
    'user' => 'economics_user',
    'pass' => 'economics123',
    'root_user' => 'root',
    'root_pass' => ''
];

$response = ['success' => false, 'message' => ''];

try {
    // Try primary connection first
    try {
        $db = new PDO(
            "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset=utf8mb4",
            $db_config['user'],
            $db_config['pass'],
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_TIMEOUT => 5
            ]
        );
    } catch (PDOException $e) {
        // Fallback to root if primary fails
        error_log("Primary connection failed, trying root: " . $e->getMessage());
        $db = new PDO(
            "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset=utf8mb4",
            $db_config['root_user'],
            $db_config['root_pass'],
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
    }

    // Verify POST request
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Invalid request method");
    }

    // Validate required fields
    $required = ['name', 'email', 'subject', 'message'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            throw new Exception(ucfirst($field) . " is required");
        }
    }

    // Sanitize inputs
    $data = [
        'name' => substr(trim($_POST['name']), 0, 100),
        'email' => filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL),
        'subject' => substr(trim($_POST['subject']), 0, 200),
        'message' => substr(trim($_POST['message']), 0, 5000)
    ];

    // Validate email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email address format");
    }

    // Insert with transaction
    $db->beginTransaction();
    
    $stmt = $db->prepare("INSERT INTO contact_messages 
                         (name, email, subject, message) 
                         VALUES (:name, :email, :subject, :message)");
    
    if ($stmt->execute($data)) {
        $db->commit();
        $response = [
            'success' => true,
            'message' => 'Thank you for contacting the Economics Department!'
        ];
        
        // Send email notification
        $to = "economics@rgc.edu.bd";
        $subject = "Economics Contact: " . $data['subject'];
        $headers = "From: " . $data['email'] . "\r\n";
        $headers .= "Reply-To: " . $data['email'] . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        $email_body = "Name: " . $data['name'] . "\n";
        $email_body .= "Email: " . $data['email'] . "\n\n";
        $email_body .= "Message:\n" . $data['message'] . "\n";
        
        mail($to, $subject, $email_body, $headers);
    }

} catch(PDOException $e) {
    $error_code = $e->getCode();
    $error_msg = $e->getMessage();
    
    error_log("DB Error $error_code: $error_msg");
    
    if (isset($db) && $db->inTransaction()) {
        $db->rollBack();
    }
    
    $response['message'] = match($error_code) {
        1044, 1045 => 'Database configuration issue',
        2002, 2003 => 'Database server unavailable',
        default => 'Database error occurred'
    };
    
} catch(Exception $e) {
    error_log("General Error: " . $e->getMessage());
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;
?>