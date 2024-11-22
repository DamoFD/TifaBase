<?php

declare(strict_types=1);

// Autoload dependencies
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

use TifaBase\Controllers\HomeController;

$controller = new HomeController();
$controller->index();
