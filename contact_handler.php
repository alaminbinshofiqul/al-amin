<?php
if (ob_get_length()) ob_end_clean();
// Strict error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors to users
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');

// Ensure no output before headers
if (ob_get_level()) ob_end_clean();

// Set JSON header FIRST
header('Content-Type: application/json');

// Database configuration - UPDATE IF NEEDED
define('DB_HOST', 'localhost');
define('DB_USER', 'chem_user');
define('DB_PASS', 'chemistry123');
define('DB_NAME', 'chemistry_website');

// Create response array
$response = ['success' => false, 'message' => 'Initialization failed'];

try {
    // Connect to database
    $db = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );

    // Only process POST requests
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        $response['message'] = 'Invalid request method';
        echo json_encode($response);
        exit;
    }

    // Validate input
    $required = ['name', 'email', 'subject', 'message'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            $response['message'] = ucfirst($field) . ' is required';
            echo json_encode($response);
            exit;
        }
    }

    // Sanitize input
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars($_POST['subject'], ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email address';
        echo json_encode($response);
        exit;
    }

    // Insert into database
    $stmt = $db->prepare("INSERT INTO contact_messages (name, email, subject, message) 
                         VALUES (:name, :email, :subject, :message)");
    
    if ($stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':subject' => $subject,
        ':message' => $message
    ])) {
        $response = [
            'success' => true,
            'message' => 'Thank you! Your message has been sent.'
        ];
        
        // Optional email notification
        $to = "chemistry@rgc.edu.bd";
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        mail($to, "New Contact: $subject", $message, $headers);
    }

} catch(PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    $response['message'] = 'Database error occurred';
} catch(Exception $e) {
    error_log("General Error: " . $e->getMessage());
    $response['message'] = 'An error occurred';
}

// Ensure no output after this point
die(json_encode($response));
?>