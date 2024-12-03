<?php

namespace TifaBase\Requests;

/**
* Base Request Class validates and sanitizes data
*
* @since 0.0.1
*/
abstract class Request
{
    /**
    * Array of data sent by in request
    *
    * @var array<mixed>
    *
    * @since 0.0.1
    */
    protected array $data = [];

    /**
    * Array of errors
    *
    * @var array<string[]>
    *
    * @since 0.0.1
    */
    protected array $errors = [];

    /**
    * Constructor sets data
    *
    * @param array<mixed> $data
    *
    * @since 0.0.1
    */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
    * Rules provided by child class
    *
    * @return array<string[]>
    *
    * @since 0.0.1
    */
    abstract protected function rules(): array;

    /**
    * Validates the data based on
    * provided rules and sets the errors
    *
    * @return bool
    *
    * @since 0.0.1
    */
    public function validate(): bool
    {
        $rules = $this->rules();

        // loop through the provided rules
        foreach ($rules as $field => $rules) {
            $value = $this->data[$field] ?? null;

            foreach ($rules as $rule) {
                // If the field is missing and the rule is 'required', add an error and stop further checks for this field
                if ($rule === 'required' && ($value === null || $value === '')) {
                    $this->addError($field, $rule);
                    break;
                }

                // Skip validation for other rules if the field is not present and it's not a 'required' rule
                if (($value === null || $value === '') && $rule !== 'required') {
                    continue;
                }

                // Apply the rule and add an error if it fails
                if (!$this->applyRule($value, $rule)) {
                    $this->addError($field, $rule);
                }
            }
        }

        return empty($this->errors);
    }

    /**
    * Returns the errors
    *
    * @return array<string[]>
    *
    * @since 0.0.1
    */
    public function errors(): array
    {
        return $this->errors;
    }

    /**
    * Creates rule definitions
    *
    * @param string $rule
    * @param mixed $value
    *
    * @return bool
    *
    * @since 0.0.1
    */
    private function applyRule($value, string $rule): bool
    {
        if ($rule === 'required') {
            return !is_null($value) && $value !== '';
        }

        if ($rule === 'email') {
            return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
        }

        if ($rule === 'string') {
            return is_string($value);
        }

        if (strpos($rule, 'min:') === 0) {
            $min = (int) explode(':', $rule)[1];
            return is_string($value) && strlen($value) >= $min;
        }

        if (strpos($rule, 'max:') === 0) {
            $max = (int) explode(':', $rule)[1];
            return is_string($value) && strlen($value) <= $max;
        }

        return true;
    }

    /**
    * Adds an error to the errors array
    *
    * @param string $field
    * @param string $rule
    *
    * @return void
    *
    * @since 0.0.1
    */
    private function addError(string $field, string $rule): void
    {
        $this->errors[$field][] = $this->getErrorMessage($field, $rule);
    }

    /**
    * Creates an error message
    *
    * @param string $field
    * @param string $rule
    *
    * @return string
    *
    * @since 0.0.1
    */
    private function getErrorMessage(string $field, string $rule): string
    {
        $messages = [
            'required' => "The $field field is required.",
            'email' => "The $field field must be a valid email address.",
            'string' => "The $field field must be a string.",
            'min' => "The $field field must be at least :min characters long.",
            'max' => "The $field field may not be greater than :max characters.",
        ];

        if (strpos($rule, 'min:') === 0) {
            $min = explode(':', $rule)[1];
            return str_replace(':min', $min, $messages['min']);
        }

        if (strpos($rule, 'max:') === 0) {
            $max = explode(':', $rule)[1];
            return str_replace(':max', $max, $messages['max']);
        }

        return $messages[$rule];
    }
}
