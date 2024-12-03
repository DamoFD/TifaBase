<?php

namespace TifaBase\Responses;

/**
* User json responses
*
* @since 0.0.1
*/
class UserResponse
{
    /**
    * Returns auth user data
    *
    * @param array $user
    *
    * @return void
    *
    * @since 0.0.1
    */
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
