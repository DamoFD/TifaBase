<?php

namespace TifaBase\Storage;

use PDO;
use PDOException;

/**
* Class Database Creates Connection to MySQL
*
* @since 0.0.1
*/
class Database
{
    /**
    * The PDO instance
    *
    * @var PDO
    *
    * @since 0.0.1
    */
    private PDO $connection;

    /**
    * Database constructor
    * Sets up the PDO connection
    *
    * @since 0.0.1
    */
    public function __construct()
    {
        $config = require __DIR__ . '/../../config/database.php';

        try {
            $dsn = "mysql:host={$config['host']};port={$config['db_port']};dbname={$config['database']}";
            $this->connection = new PDO(
                $dsn,
                $config['username'],
                $config['password'],
                $config['options']
            );
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    /**
    * Returns the PDO instance
    *
    * @return PDO
    *
    * @since 0.0.1
    */
    public function getConnection(): PDO
    {
        return $this->connection;
    }

    /**
    * Checks if the connection is established
    *
    * @return bool
    *
    * @since 0.0.1
    */
    public function isConnected(): bool
    {
        return $this->connection !== null;
    }
}
