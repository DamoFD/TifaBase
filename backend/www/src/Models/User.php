<?php

namespace TifaBase\Models;

use TifaBase\Storage\Database;
use TifaBase\Models\Authenticatable;
use PDO;
use PDOException;

/**
* Class User
*
* @since 0.0.1
*/
class User extends Authenticatable
{
    /**
    * The PDO instance
    *
    * @var PDO
    *
    * @since 0.0.1
    */
    private PDO $connection;

    /**
    * User constructor
    *
    * @since 0.0.1
    */
    public function __construct()
    {
        $this->connection = (new Database())->getConnection();
        $this->initializeSecret();
    }

    public function register(array $data): array
    {
        // Check if user already exists
        $sql = "SELECT id FROM users WHERE email = :email";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute(['email' => $data['email']]);
        if ($stmt->fetch()) {
            return ['success' => false, 'message' => 'User already exists'];
        }

        // Hash the password
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        // Insert new user into the database
        $sql = "INSERT INTO users (email, password, role) VALUES (:email, :password, :role)";
        $stmt = $this->connection->prepare($sql);

        try {
            $stmt->execute([
                'email' => $data['email'],
                'password' => $hashedPassword,
                'role' => $data['role'] ?? 'user',
            ]);
            return ['success' => true, 'message' => 'User registered successfully'];
        } catch (PDOException $e) {
            return ['success' => false, 'message' => 'Failed to register user: ' . $e->getMessage()];
        }
    }

    public function login(array $credentials): array
    {
        // Retrieve user from database
        $sql = "SELECT id, email, password, role FROM users WHERE email = :email";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute(['email' => $credentials['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verify the password
        if (!$user || !password_verify($credentials['password'], $user['password'])) {
            return ['success' => false, 'message' => 'Invalid email or password'];
        }

        // Generate JWT
        $payload = [
            'id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
        ];
        $token = $this->generateToken($payload);

        return ['success' => true, 'token' => $token];
    }
}
