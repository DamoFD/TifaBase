<?php

namespace TifaBase\Responses;

/**
* Login user json responses
*
* @since 0.0.1
*/
class LoginUserResponse extends Response
{
    /**
    * Invalid credentials response
    *
    * @return void
    *
    * @since 0.0.1
    */
    public static function invalidCredentials(): void
    {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'code' => 401,
            'message' => 'Invalid email or password.',
        ]);
    }

    /**
    * Login successful response
    *
    * @return void
    *
    * @since 0.0.1
    */
    public static function success(): void
    {
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'code' => 200,
            'message' => 'User logged in successfully.',
        ]);
    }
}
