<?php

namespace TifaBase\Requests;

use TifaBase\Requests\Request;

/**
* Register User Request Validation
*
* @since 0.0.1
*/
class RegisterUserRequest extends Request
{
    /**
    * Creates the rules for register post request
    *
    * @return array<string[]>
    *
    * @since 0.0.1
    */
    protected function rules(): array
    {
        return [
            'email' => ['required', 'email', 'max:255', 'string'],
            'password' => ['required', 'string', 'min:6'],
        ];
    }
}
