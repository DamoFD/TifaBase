.PHONY: migrate-up migrate-down

CONTAINER_NAME= tifabase_backend

migrate-up:
	docker exec -it $(CONTAINER_NAME) bash -c "php -r \"require_once './vendor/autoload.php'; (new \TifaBase\Commands\Migrations())->up();\""

migrate-down:
	docker exec -it $(CONTAINER_NAME) bash -c "php -r \"require_once './vendor/autoload.php'; (new \TifaBase\Commands\Migrations())->down();\""

migrate-fresh:
	docker exec -it $(CONTAINER_NAME) bash -c "php -r \"require_once './vendor/autoload.php'; (new \TifaBase\Commands\Migrations())->down();\n(new \TifaBase\Commands\Migrations())->up();\""
