<p align="center">
    <a href="https://pocketbase.io" target="_blank" rel="noopener">
        <img src="" alt="TifaBase - open source php backend as a service" />
    </a>
</p>

<p align="center">

</p>

[TifaBase](https://tifabase.com) is an open source PHP backend that includes:

- SQL database (_MySQL_) with **realtime subscriptions**
- built-in **files and users management**
- convenient **Admin dashboard UI**
- and simple **REST API**
- one click install for shared hosting solutions

**For documentation and examples, please visit https://tifabase.com/docs.**

> [!WARNING]
> Please keep in mind that TifaBase is still under active development
> and therefore full backward compatibility is not guaranteed before reaching v1.0.0.

## API SDK clients

The easiest way to interact with the API is to use one of the official SDK clients:

- **JavaScript - [tifabase/js-sdk](https://github.com/tifabase/js-sdk)** (_browser and node_)
- **PHP - [tifabase/php-sdk](https://github.com/tifabase/dart-sdk)** (_web servers_)

## Overview

### How to setup the development server

The easiest way to setup the development server is with [Docker](https://www.docker.com/).

The requirements without docker are:
- [Node 10.9.0+](https://nodejs.org/en)
- [PHP 8.2+](https://www.php.net/)
- [Composer 2.8+](https://getcomposer.org/)
- [MySQL 9.0+](https://www.mysql.com/)

Here is a minimal example with Docker:

0. Ensure the requirements are met (_either the correct dependencies or Docker_)

1. Clone the repository `git clone https://github.com/TifaBase/TifaBase`.

2. Copy the .env.example to a .env in the `/backend/www` directory.

3. Go to the root of the project and start the server with `docker compose up`.

4. Run the migrations by going into the root directory and executing the migration command `make migrate-up`.

5. Visit `localhost:5173` to view the frontend. PHPMyAdmin is available on `localhost:8080`

## Security

If you discover a security vulnerability within TifaBase, please send an e-mail to **support at tifabase.com**.

All reports will be promptly addressed and you'll be credited in the fix release notes.

## Contributing

TifaBase is free and open source project licensed under the [MIT License](LICENSE.md).
You are free to do whatever you want with it, even offering it as a paid service.

You could help continuing its development by:

- [Contribute to the source code](CONTRIBUTING.md)
- [Suggest new features and report issues](https://github.com/TifaBase/TifaBase/issues)

PRs for new OAuth2 providers, bug fixes, code optimizations and documentation improvements are more than welcome.

But please refrain creating PRs for _new features_ without previously discussing the implementation details.
TifaBase has a [roadmap](https://github.com/orgs/tifabase/projects/2) and I try to work on issues in specific order and such PRs often come in out of nowhere and skew all initial planning with tedious back-and-forth communication.

Don't get upset if I close your PR, even if it is well executed and tested. This doesn't mean that it will never be merged.
Later we can always refer to it and/or take pieces of your implementation when the time comes to work on the issue (don't worry you'll be credited in the release notes).
