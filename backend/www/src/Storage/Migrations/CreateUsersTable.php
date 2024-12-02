<?php

namespace TifaBase\Storage\Migrations;

use TifaBase\Storage\Database;
use PDOException;

/**
* Class CreateUsersTable contains the migrations for the users table
*
* @since 0.0.1
*/
class CreateUsersTable
{

    /**
    * Database instance
    *
    * @var Database
    *
    * @since 0.0.1
    */
    private Database $db;

    /**
    * CreateUsersTable constructor
    * Sets up the database instance
    *
    * @since 0.0.1
    */
    public function __construct()
    {
        $this->db = new Database();
    }

    /**
    * Migrate the database
    *
    * @return void
    *
    * @since 0.0.1
    */
    public function up(): void
    {
        $sql = "
            CREATE TABLE IF NOT EXISTS `users` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `email` VARCHAR(100) NOT NULL UNIQUE,
                `password` VARCHAR(255) NOT NULL,
                `role` ENUM('user', 'superuser') NOT NULL DEFAULT 'user',
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );";

        try {
            $this->db->getConnection()->exec($sql);
        } catch (PDOException $e) {
            die("Database migration failed: " . $e->getMessage());
        }
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
        $sql = "DROP TABLE IF EXISTS `users`;";

        try {
            $this->db->getConnection()->exec($sql);
        } catch (PDOException $e) {
            die("Database migration failed: " . $e->getMessage());
        }
    }
}
