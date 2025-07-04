<?php
// --- DATABASE CREDENTIALS ---
$servername = "localhost";
$username = "root";       // Default XAMPP username
$password = "";           // Default XAMPP password
$dbname = "rgc_sociology";

// Set header to return JSON
header('Content-Type: application/json');
$response = [];

// --- DATABASE CONNECTION ---
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    $response['status'] = 'error';
    $response['message'] = 'Database connection failed: ' . $conn->connect_error;
    echo json_encode($response);
    exit();
}

// --- PROCESS & VALIDATE FORM DATA ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $response['status'] = 'error';
        $response['message'] = 'All fields are required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['status'] = 'error';
        $response['message'] = 'Invalid email format.';
    } else {
        // --- INSERT DATA USING PREPARED STATEMENT (for security) ---
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $subject, $message);

        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['message'] = 'Thank you! Your message has been sent successfully.';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Error: Could not send the message.';
        }
        $stmt->close();
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method.';
}

$conn->close();
echo json_encode($response);
?>