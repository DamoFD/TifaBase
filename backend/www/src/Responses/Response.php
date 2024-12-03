<?php

namespace TifaBase\Responses;

/**
* Base response class
*
* @since 0.0.1
*/
class Response
{
    /**
    * Validation failed response
    *
    * @param array $errors<string[string]>
    *
    * @return void
    *
    * @since 0.0.1
    */
    public static function validationFailed(array $errors): void
    {
        http_response_code(422);
        echo json_encode([
            'status' => 'error',
            'code' => 422,
            'message' => 'Validation failed.',
            'errors' => $errors,
        ]);
    }
}
