<?php

// Autoload dependencies
require __DIR__ . '/../vendor/autoload.php';

use Tifabase\Controllers\HomeController;

$controller = new HomeController();
$controller->index();
