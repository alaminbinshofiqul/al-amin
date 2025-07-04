<?php

// 1. SHOW ALL ERRORS - The most important lines for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 2. Database Connection Details
$servername = "localhost";
$username = "root";
$password = ""; // Default XAMPP password is an empty string
$dbname = "college_db"; // <-- DOUBLE-CHECK THIS NAME

// 3. Create a Database Connection
$conn = new mysqli($servername, $username, $password, $dbname);

// 4. Check the Connection
if ($conn->connect_error) {
    die("<h1>Connection Failed!</h1><p>Error: " . $conn->connect_error . "</p><p><b>Check:</b> Are your database name ('" . $dbname . "'), username, and password correct?</p>");
}

// 5. Check if the form was submitted using POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Check if all form fields are present
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {
        
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $message = $_POST['message'];
        
        // 6. Prepare the SQL Statement (Table name `messages` must be correct)
        $stmt = $conn->prepare("INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
        
        // Check if statement preparation was successful
        if ($stmt === false) {
            die("<h1>SQL Prepare Failed!</h1><p>Error: " . $conn->error . "</p><p><b>Check:</b> Does the table 'messages' exist? Do the column names (name, email, subject, message) match exactly?</p>");
        }
        
        $stmt->bind_param("ssss", $name, $email, $subject, $message);
        
        // 7. Execute the Statement and Give User Feedback
        if ($stmt->execute()) {
            echo "<h2>Success!</h2>";
            echo "<p>Your message has been saved to the database.</p>";
            echo "<a href='physics.php'>Return to the homepage</a>";
        } else {
            echo "<h1>Execution Failed!</h1>";
            echo "<p>Error: " . $stmt->error . "</p>";
        }
        
        // 8. Close the statement
        $stmt->close();
        
    } else {
        echo "<h1>Error!</h1><p>One or more form fields are missing.</p>";
    }
} else {
    // Optional: Handle cases where the script is accessed directly
    echo "This page should be accessed via the contact form.";
}

// 9. Close the connection
$conn->close();

?>