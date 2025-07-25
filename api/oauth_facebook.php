<?php
// Placeholder Facebook OAuth endpoint.
// TODO: integrate with Facebook OAuth.

header('Content-Type: application/json');

echo json_encode([
    'success' => false,
    'message' => 'Facebook OAuth integration has not been configured yet. Please contact the administrator.'
]);
