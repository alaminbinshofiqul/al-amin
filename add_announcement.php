<?php
include 'db_announcement.php';

$title = $_POST['title'];
$content = $_POST['content'];

$stmt = $conn->prepare("INSERT INTO college_announcement (title, content) VALUES (?, ?)");
$stmt->bind_param("ss", $title, $content);

if ($stmt->execute()) {
  echo "<script>alert('Announcement posted successfully!'); window.location.href='announcement_form.html';</script>";
} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
