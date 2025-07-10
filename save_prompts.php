<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$promptsFile = 'prompts.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if ($data === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }
    
    // Validate that data is an array
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Data must be an array']);
        exit;
    }
    
    // Save to file
    $result = file_put_contents($promptsFile, json_encode($data, JSON_PRETTY_PRINT));
    
    if ($result === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save prompts']);
    } else {
        echo json_encode(['success' => true, 'message' => 'Prompts saved successfully']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?> 