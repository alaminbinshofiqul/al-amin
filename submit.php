<?php
include 'db.php';

$firstName = $_POST['firstName'];
$lastName  = $_POST['lastName'];
$email     = $_POST['email'];
$phone     = $_POST['phone'];
$subject   = $_POST['subject'];
$message   = $_POST['message'];

$stmt = $conn->prepare("INSERT INTO contact_form1 (first_name, last_name, email, phone, subject, message)
                        VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $firstName, $lastName, $email, $phone, $subject, $message);

if ($stmt->execute()) {
    echo "<script>alert('Message sent successfully!'); window.location.href='contact.html';</script>";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
