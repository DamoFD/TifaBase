<?php

namespace TifaBase\Controllers;

use TifaBase\Storage\Database;
use TifaBase\Controllers\UserController;

class HomeController
{
    public function index()
    {
        echo 'Hello World';

        $database = new Database();
        var_dump($database->isConnected());
        phpinfo();

        $userController = new UserController();
        $userController->login();
    }
}
