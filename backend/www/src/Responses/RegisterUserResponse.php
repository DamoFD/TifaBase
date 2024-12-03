<?php

namespace TifaBase\Responses;

/**
* Register user json responses
*
* @since 0.0.1
*/
class RegisterUserResponse extends Response
{
    /**
    * User already exists response
    *
    * @return void
    *
    * @since 0.0.1
    */
    public static function userAlreadyExists(): void
    {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'code' => 400,
            'message' => 'User already exists.',
        ]);
    }
}
