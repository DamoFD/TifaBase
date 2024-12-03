<?php

namespace TifaBase\Router;

use TifaBase\Controllers\UserController;
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
    * Middleware manager
    *
    * @var MiddlewareManager
    *
    * @since 0.0.1
    */
    private MiddlewareManager $middlewareManager;

    /**
    * Router constructor
    *
    * @since 0.0.1
    */
    public function __construct()
    {
        $this->middlewareManager = new MiddlewareManager();

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

        $this->group($router, ['middleware' => ['auth']], function (RouteGroup $group) {
            $group->addRoute(['GET'], '/api/v1/@me', [UserController::class, 'me']);
        });
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

                // Apply middleware for the route
                $handlerKey = serialize($routeInfo[1]);
                $this->middlewareManager->applyMiddleware($handlerKey);

                $this->handleRequest(new $controller(), $method, $parameters);
                break;
        }
    }

    /**
    * Group routes
    *
    * @param RouteCollector $router
    * @param array $options
    * @param callable $callback
    *
    * @return void
    *
    * @since 0.0.1
    */
    private function group(RouteCollector $router, array $options, callable $callback): void
    {
        $middlewares = $options['middleware'] ?? [];
        $callback(new RouteGroup($router, $this->middlewareManager, $middlewares));
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
