<?php
// Placeholder Google OAuth endpoint.
// TODO: implement full OAuth flow.

header('Content-Type: application/json');

echo json_encode([
    'success' => false,
    'message' => 'Google OAuth integration has not been configured yet. Please contact the administrator.'
]);
