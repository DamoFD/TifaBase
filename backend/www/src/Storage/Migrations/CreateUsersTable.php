<?php

namespace TifaBase\Storage\Migrations;

use TifaBase\Storage\Database;
use PDOException;

class CreateUsersTable
{

    private Database $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function up()
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

    public function down() 
    {
        $sql = "DROP TABLE IF EXISTS `users`;";

        try {
            $this->db->getConnection()->exec($sql);
        } catch (PDOException $e) {
            die("Database migration failed: " . $e->getMessage());
        }
    }
}
