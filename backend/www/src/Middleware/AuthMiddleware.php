<?php

namespace TifaBase\Middleware;

use TifaBase\Models\User;

class AuthMiddleware
{
    /**
    * Validate the JWT token
    *
    * @return array|null the decoded user payload if the token is valid; null otherwise
    *
    * @since 0.0.1
    */
    public function handle(): ?array
    {
        try {
            $user = new User();
            $token = $user->getToken();

            if (!$token) {
                http_response_code(401);
                echo json_encode([
                    'error' => 'Unauthorized: Token not found',
                ]);
                exit;
            }

            $userPayload = $user->validateToken($token);
            return $userPayload;
        } catch (\Exception $e) {
            http_response_code(401);
            echo json_encode([
                'error' => 'Unauthorized: ' . $e->getMessage(),
            ]);
            exit;
        }
    }
}
