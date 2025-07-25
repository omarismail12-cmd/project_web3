<?php
include 'db.php';

$sql = "SELECT * FROM facilities";
$stmt = $pdo->query($sql);
$facilities = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facilities</title>
</head>
<body>
    <h1>Facilities</h1>
    <a href="add_facility.php">Add New Facility</a>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Sport</th>
            <th>Description</th>
            <th>Features</th>
            <th>Price</th>
            <th>Image URL</th>
            <th>Capacity</th>
            <th>Availability</th>
            <th>Owner ID</th>
            <th>Actions</th>
        </tr>
        <?php foreach ($facilities as $facility): ?>
        <tr>
            <td><?php echo htmlspecialchars($facility['id']); ?></td>
            <td><?php echo htmlspecialchars($facility['name']); ?></td>
            <td><?php echo htmlspecialchars($facility['sport']); ?></td>
            <td><?php echo htmlspecialchars($facility['description']); ?></td>
            <td><?php echo htmlspecialchars($facility['features']); ?></td>
            <td><?php echo htmlspecialchars($facility['price']); ?></td>
            <td><?php echo htmlspecialchars($facility['image_url']); ?></td>
            <td><?php echo htmlspecialchars($facility['capacity']); ?></td>
            <td><?php echo htmlspecialchars($facility['availability']); ?></td>
            <td><?php echo htmlspecialchars($facility['owner_id']); ?></td>
            <td>
                <a href="delete_facility.php?id=<?php echo $facility['id']; ?>">Delete</a>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
