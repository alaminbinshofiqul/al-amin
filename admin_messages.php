<?php
session_start();

// Simple authentication - in production use proper authentication
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: admin_login.php");
    exit();
}

// Database connection
$conn = new mysqli('localhost', 'root', '', 'college_website');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get all messages
$result = $conn->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Contact Messages</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Contact Messages</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars($row['id']) ?></td>
            <td><?= htmlspecialchars($row['name']) ?></td>
            <td><?= htmlspecialchars($row['email']) ?></td>
            <td><?= htmlspecialchars($row['subject']) ?></td>
            <td><?= nl2br(htmlspecialchars($row['message'])) ?></td>
            <td><?= htmlspecialchars($row['created_at']) ?></td>
        </tr>
        <?php endwhile; ?>
    </table>
    <p><a href="logout.php">Logout</a></p>
</body>
</html>
<?php $conn->close(); ?>