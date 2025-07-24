<?php
require_once 'db.php'; // Your DB connection file

echo '<html><body style="font-family: sans-serif; padding: 20px;">';
echo '<h1>Database Fix Script</h1>';

// SQL to alter the table
$sql = 'ALTER TABLE `users` CHANGE `password` `password` VARCHAR(255) NOT NULL;';

echo '<p>Attempting to change the `password` column in the `users` table to VARCHAR(255)...</p>';

if ($conn->query($sql) === TRUE) {
    echo '<h3 style="color: green;">SUCCESS: The `users` table was updated successfully.</h3>';
    echo '<p>The `password` column can now store full password hashes.</p>';
    echo '<p><b>Important:</b> Please delete any existing users and sign up again to create a new user with a correctly stored password. Then, try signing in.</p>';
} else {
    echo '<h3 style="color: red;">ERROR: Could not alter the table.</h3>';
    echo '<p><b>Error Details:</b> ' . htmlspecialchars($conn->error) . '</p>';
    echo '<p>Please check your database connection in `db.php` or run the SQL command manually in phpMyAdmin:</p>';
    echo '<pre style="background: #eee; padding: 10px; border-radius: 5px;">' . $sql . '</pre>';
}

$conn->close();

echo '<p style="margin-top: 20px; font-weight: bold; color: #d9534f;">For security reasons, please delete this file (`fix_database.php`) from your project folder after running it.</p>';
echo '</body></html>';
