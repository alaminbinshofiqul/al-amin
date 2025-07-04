<?php
include 'db_announcement.php';

$sql = "SELECT * FROM college_announcement ORDER BY created_at DESC";
$result = $conn->query($sql);

$announcements = [];

while ($row = $result->fetch_assoc()) {
  $announcements[] = $row;
}

header('Content-Type: application/json');
echo json_encode($announcements);
?>
