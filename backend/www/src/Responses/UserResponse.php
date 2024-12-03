<?php

namespace TifaBase\Responses;

class UserResponse
{
    public static function me(array $user): void
    {
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'code' => 200,
            'user' => $user,
        ]);
    }
}
