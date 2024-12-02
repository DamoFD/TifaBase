<?php

namespace TifaBase\Commands;

use TifaBase\Storage\Migrations\CreateUsersTable;

/**
* Class Migrations contains the migration commands
*
* @since 0.0.1
*/
class Migrations
{
    /**
    * Migrate the database
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function up(): void
    {
        (new CreateUsersTable())->up();
    }

    /**
    * Rollback the database
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function down(): void
    {
        (new CreateUsersTable())->down();
    }
}
