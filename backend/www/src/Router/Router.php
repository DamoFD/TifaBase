<?php

namespace TifaBase\Router;

use TifaBase\Controllers\UserController;
use TifaBase\Middleware\AuthMiddleware;
use FastRoute\RouteCollector;
use FastRoute\Dispatcher;
use function FastRoute\simpleDispatcher;

/**
* Class Router creates the routing for the application
*
* @since 0.0.1
*/
class Router
{
    /**
    * Dispatcher instance
    *
    * @var Dispatcher
    *
    * @since 0.0.1
    */
    private Dispatcher $dispatcher;

    /**
    * Router constructor
    *
    * @since 0.0.1
    */
    public function __construct()
    {
        // Create the FastRoute dispatcher
        $this->dispatcher = simpleDispatcher(function (RouteCollector $router) {
            $this->registerRoutes($router);
        });
    }

    /**
    * Register routes
    *
    * @param RouteCollector $router
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function registerRoutes(RouteCollector $router): void
    {
        $router->addRoute(['POST'], '/api/v1/login', [UserController::class, 'login']);
        $router->addRoute(['POST'], '/api/v1/register', [UserController::class, 'register']);
        $router->addRoute(['GET'], '/api/v1/@me', [UserController::class, 'me']);
    }

    /**
    * Dispatch the request
    *
    * @param string $httpMethod
    * @param string $uri
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function dispatch(string $httpMethod, string $uri): void
    {
        $routeInfo = $this->dispatcher->dispatch($httpMethod, $uri);

        // Handle request cases
        switch ($routeInfo[0]) {
            case Dispatcher::NOT_FOUND:
                http_response_code(404);
                break;

            case Dispatcher::METHOD_NOT_ALLOWED:
                http_response_code(405);
                break;

            case DISPATCHER::FOUND:
                [$controller, $method] = $routeInfo[1];
                $parameters = $routeInfo[2];

                // Apply authentication middleware for protected routes
                if ($this->isProtectedRoute($uri)) {
                    $authMiddleware = new AuthMiddleware();
                    $authMiddleware->handle();
                }

                $this->handleRequest(new $controller(), $method, $parameters);
                break;
        }
    }

    private function isProtectedRoute(string $uri): bool
    {
        $protectedRoutes = ['/api/v1/@me'];

        return in_array($uri, $protectedRoutes, true);
    }

    /**
    * Handle request data
    *
    * @param object $controller
    * @param string $method
    * @param array $parameters
    *
    * @return void
    *
    * @since 0.0.1
    */
    private function handleRequest(object $controller, string $method, array $parameters): void
    {
        // Capture POST data
        $postData = $this->getRequestData();

        // Pass parameters and POST data to the controller
        call_user_func([$controller, $method], $postData, $parameters);
    }

    /**
    * Get request data
    *
    * @return array
    *
    * @since 0.0.1
    */
    private function getRequestData(): array
    {
        // Check for JSON payload
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        if (stripos($contentType, 'application/json') !== false) {
            $input = file_get_contents('php://input');
            return json_decode($input, true) ?? [];
        }

        // Default to $_POST for form-encoded data
        return $_POST;
    }
}
