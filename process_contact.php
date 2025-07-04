<?php
// Database configuration
$dbHost     = 'localhost';
$dbUsername = 'root'; // default XAMPP username
$dbPassword = '';     // default XAMPP password is empty
$dbName     = 'college_website';

// Create database connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Validate input
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    die("Please fill all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format.");
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $subject, $message);

// Execute the statement
if ($stmt->execute()) {
    // Success - redirect back to contact page with success message
    header("Location: physics.html?success=1");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>