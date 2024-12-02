<?php

namespace TifaBase\Models;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Authenticatable
{
    private string $jwtSecret;

    protected function initializeSecret(): void
    {
        if (isset($this->jwtSecret)) {
            return;
        }

        $this->jwtSecret = 'secret';
    }

    public function generateToken(array $userPayload)
    {
        $payload = array_merge($userPayload, [
            'iss' => 'TifaBase',
            'aud' => 'TifaBase',
            'iat' => time(),
            'exp' => time() + 3600
        ]);

        return JWT::encode($payload, $this->jwtSecret, 'HS256');
    }

    public function validateToken(string $token): array
    {
        try {
            return (array) JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
        } catch (\Exception $e) {
            throw new \Exception('Invalid token: ' . $e->getMessage());
        }
    }
}
