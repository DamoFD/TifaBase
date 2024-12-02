<?php

namespace TifaBase\Controllers;

use TifaBase\Models\User;

class UserController
{
    public User $user;

    public function __construct()
    {
        $this->user = new User();
    }

    public function store()
    {
        $result = $this->user->register([
            'email' => 'test@test.com',
            'password' => 'password',
            'role' => 'user',
        ]);

        if ($result['success']) {
            echo "Registration successful: " . $result['message'];
        } else {
            echo "Registration failed: " . $result['message'];
        }
    }

    public function login()
    {
        $result = $this->user->login([
            'email' => 'test@test.com',
            'password' => 'password',
        ]);

        if ($result['success']) {
            echo "Login successful: " . $result['token'];
        } else {
            echo "Login failed: " . $result['message'];
        }
    }
}
