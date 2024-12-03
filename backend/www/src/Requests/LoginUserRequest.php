<?php

namespace TifaBase\Requests;

use TifaBase\Requests\Request;

/**
* Login User Request Validation
*
* @since 0.0.1
*/
class LoginUserRequest extends Request
{
    /**
    * Creates the rules for login post request
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
