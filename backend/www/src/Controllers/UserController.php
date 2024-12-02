<?php

namespace TifaBase\Controllers;

use TifaBase\Models\User;
use TifaBase\Requests\LoginUserRequest;
use TifaBase\Requests\RegisterUserRequest;

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
            http_response_code(422);

            echo json_encode([
                'status' => 'error',
                'code' => 422,
                'message' => 'Validation failed.',
                'errors' => $request->errors(),
            ]);

            return;
        }

        $requestData['role'] = 'user';

        $result = $this->user->register($requestData);

        // Fail if bad credentials
        if (!$result['success']) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'code' => 400,
                'message' => $result['message'],
            ]);

            return;
        }

        // Login if successful
        $this->login($requestData);

        return;
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
            http_response_code(422);

            echo json_encode([
                'status' => 'error',
                'code' => 422,
                'message' => 'Validation failed.',
                'errors' => $request->errors(),
            ]);

            return;
        }

        // Attempt user login
        $user = new User();
        $authenticated = $user->login($requestData);

        // Fail if bad credentials
        if (!$authenticated['success']) {
            http_response_code(401);
            echo json_encode([
                'status' => 'error',
                'code' => 401,
                'message' => $authenticated['message'],
            ]);

            return;
        }

        // Return token if successful
        echo json_encode([
            'status' => 'success',
            'code' => 200,
            'message' => 'User logged in successfully.',
            'token' => $authenticated['token'],
        ]);
    }
}
