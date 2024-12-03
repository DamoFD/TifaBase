<?php

namespace TifaBase\Router;

use TifaBase\Middleware\AuthMiddleware;

/**
* Class MiddlewareManager registers the middlewares
*
* @since 0.0.1
*/
class MiddlewareManager
{
    /**
    * Route middleware
    *
    * @var array<string>
    *
    * @since 0.0.1
    */
    private array $routeMiddleware = [];

    /**
    * Maps out the middlewares
    *
    * @param string $handlerKey
    * @param array $middlewares <string>
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function mapMiddleware(string $handlerKey, array $middlewares): void
    {
        $this->routeMiddleware[$handlerKey] = $middlewares;
    }

    /**
    * Applies the middleware
    *
    * @param string $handlerKey
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function applyMiddleware(string $handlerKey): void
    {
        $middlewares = $this->routeMiddleware[$handlerKey] ?? [];
        foreach ($middlewares as $middleware) {
            $middlewareInstance = $this->resolveMiddleware($middleware);
            $middlewareInstance->handle();
        }
    }

    /**
    * Matches short name to class
    *
    * @param string $middleware
    *
    * @return Middleware
    *
    * @throws \Exception
    *
    * @since 0.0.1
    */
    private function resolveMiddleware(string $middleware)
    {
        // Register new middlewares here
        return match ($middleware) {
            'auth' => new AuthMiddleware(),
            default => throw new \Exception("Middleware [$middleware] not found"),
        };
    }
}
