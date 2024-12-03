<?php

namespace TifaBase\Router;

use FastRoute\RouteCollector;

/**
* Class RouteGroup allows group routing
*
* @since 0.0.1
*/
class RouteGroup
{
    /**
    * Middleware manager instance
    *
    * @var MiddlewareManager
    *
    * @since 0.0.1
    */
    private MiddlewareManager $middlewareManager;

    /**
    * Router instance
    *
    * @var RouteCollector
    *
    * @since 0.0.1
    */
    private RouteCollector $router;

    /**
    * Middlewares
    *
    * @var array<string>
    *
    * @since 0.0.1
    */
    private array $middlewares;

    /**
    * RouteGroup constructor
    *
    * @param RouteCollector $router
    * @param MiddlewareManager $middlewareManager
    * @param array $middlewares
    *
    * @since 0.0.1
    */
    public function __construct(RouteCollector $router, MiddlewareManager $middlewareManager, array $middlewares)
    {
        $this->router = $router;
        $this->middlewareManager = $middlewareManager;
        $this->middlewares = $middlewares;
    }

    /**
    * Adds route to the route collector
    *
    * @param array $methods
    * @param string $route
    * @param array $handler
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function addRoute(array $methods, string $route, array $handler): void
    {
        $this->router->addRoute($methods, $route, $handler);

        // Serialize the handler for middleware mapping
        $handlerKey = serialize($handler);
        $this->middlewareManager->mapMiddleware($handlerKey, $this->middlewares);
    }
}
