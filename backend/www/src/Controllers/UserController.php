<?php

namespace TifaBase\Controllers;

use TifaBase\Models\User;
use TifaBase\Requests\LoginUserRequest;
use TifaBase\Requests\RegisterUserRequest;
use TifaBase\Responses\LoginUserResponse;
use TifaBase\Responses\LogoutUserResponse;
use TifaBase\Responses\RegisterUserResponse;
use TifaBase\Responses\UserResponse;

/**
* User Controller connects request to the models
*
* @since 0.0.1
*/
class UserController
{
    /**
    * User model
    *
    * @var User
    *
    * @since 0.0.1
    */
    public User $user;

    /**
    * User Controller constructor
    *
    * @since 0.0.1
    */
    public function __construct()
    {
        $this->user = new User();
    }

    /**
    * Register a new user
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function register(array $requestData): void
    {
        $request = new RegisterUserRequest($requestData);

        // Validate the request
        if (!$request->validate()) {
            RegisterUserResponse::validationFailed($request->errors());
            return;
        }

        // Temporary
        $requestData['role'] = 'user';

        // Register the user if validation passes
        $result = $this->user->register($requestData);

        // Fail if email is taken
        if (!$result['success']) {
            RegisterUserResponse::userAlreadyExists();
            return;
        }

        // Login if successful
        $this->login($requestData);
    }

    /**
    * Login the user
    * validates the request data
    * if successful, returns a token
    *
    * @param array $requestData
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function login(array $requestData): void
    {
        $request = new LoginUserRequest($requestData);

        // Validate the request
        if (!$request->validate()) {
            LoginUserResponse::validationFailed($request->errors());
            return;
        }

        // Attempt user login
        $user = new User();
        $authenticated = $user->login($requestData);

        // Fail if bad credentials
        if (!$authenticated['success']) {
            LoginUserResponse::invalidCredentials();
            return;
        }

        // Set Cookie
        setcookie(
            'token',
            $authenticated['token'],
            [
                'expires' => time() + 3600, // 1 hour
                'path' => '/',
                'domain' => 'localhost',
                'secure' => true,
                'httponly' => true,
                'samesite' => 'strict',
            ]
        );

        // Return success
        LoginUserResponse::success();
    }

    /**
    * Logout the authenticated user
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function logout(): void
    {
        setcookie('token', '', time() - 3600, '/');

        LogoutUserResponse::success();
    }

    /**
    * Returns auth user data
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function me(): void
    {
        $user = $this->user->getAuthUser();

        UserResponse::me($user['user']);
    }
}
