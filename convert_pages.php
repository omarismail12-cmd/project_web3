<?php
// This script converts all .html pages in the /pages directory to .php,
// replacing the static header with the dynamic PHP header.

echo '<html><body style="font-family: sans-serif; padding: 20px;">';
echo '<h1>Page Conversion Script</h1>';

$pagesDir = __DIR__ . '/pages';
$headerInclude = "<?php include '../includes/header.php'; ?>";

// Get all .html files in the pages directory
$htmlFiles = glob($pagesDir . '/*.html');

if (empty($htmlFiles)) {
    echo '<p>No .html files found to convert.</p>';
    exit;
}

foreach ($htmlFiles as $htmlFile) {
    $filename = basename($htmlFile);
    $phpFile = $pagesDir . '/' . str_replace('.html', '.php', $filename);
    
    echo "<hr><h2>Processing: " . htmlspecialchars($filename) . "</h2>";

    // Read the content of the HTML file
    $content = file_get_contents($htmlFile);

    // Find the start and end of the <header> tag
    $headerStart = strpos($content, '<header');
    $headerEnd = strpos($content, '</header>');

    if ($headerStart !== false && $headerEnd !== false) {
        // Extract the part of the content after the header
        $bodyContent = substr($content, $headerEnd + strlen('</header>'));
        // Create the new PHP content
        $newContent = $headerInclude . "\n" . trim($bodyContent);
        
        // Write the new .php file
        if (file_put_contents($phpFile, $newContent)) {
            echo "<p style='color: green;'>SUCCESS: Created " . htmlspecialchars(basename($phpFile)) . "</p>";
            // Optionally, delete the old HTML file
            unlink($htmlFile);
            echo "<p style='color: orange;'>DELETED: Old file " . htmlspecialchars($filename) . "</p>";
        } else {
            echo "<p style='color: red;'>ERROR: Could not create " . htmlspecialchars(basename($phpFile)) . ".</p>";
        }
    } else {
        // If no <header> tag is found, just prepend the include and save as .php
        $newContent = $headerInclude . "\n" . $content;
        if (file_put_contents($phpFile, $newContent)) {
            echo "<p style='color: green;'>SUCCESS: Created " . htmlspecialchars(basename($phpFile)) . " (no header found, simply converted).</p>";
            unlink($htmlFile);
            echo "<p style='color: orange;'>DELETED: Old file " . htmlspecialchars($filename) . "</p>";
        } else {
            echo "<p style='color: red;'>ERROR: Could not create " . htmlspecialchars(basename($phpFile)) . ".</p>";
        }
    }
}

echo '<hr><h3 style="color: #d9534f; margin-top: 20px;">IMPORTANT: For security reasons, please delete this file (`convert_pages.php`) after running it.</h3>';
echo '</body></html>';
