<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$promptsFile = 'prompts.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if file exists
    if (!file_exists($promptsFile)) {
        echo json_encode([]);
        exit;
    }
    
    // Read file content
    $content = file_get_contents($promptsFile);
    
    if ($content === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to read prompts file']);
        exit;
    }
    
    // Decode JSON
    $data = json_decode($content, true);
    
    if ($data === null) {
        http_response_code(500);
        echo json_encode(['error' => 'Invalid JSON in prompts file']);
        exit;
    }
    
    // Return the data
    echo json_encode($data);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?> 