<?php

namespace TifaBase\Commands;

use TifaBase\Storage\Migrations\CreateUsersTable;

class Migrations
{
    public function up() {
        (new CreateUsersTable())->up();
    }

    public function down() {
        (new CreateUsersTable())->down();
    }
}
