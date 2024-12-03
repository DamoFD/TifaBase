<?php

namespace TifaBase\Responses;

class LogoutUserResponse
{
    public static function success()
    {
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'code' => 200,
            'message' => 'User logged out successfully.',
        ]);
    }
}
