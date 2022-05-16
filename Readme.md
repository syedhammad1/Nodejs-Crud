# Docker Nginx Nodejs Express

Nodejs, Nginx, MongoDB, Caching and Docker based crud application.

## Features

- Basic Authentication flow
- Docker based image
- Nginx setup
- MongoDB Database
- Express framework for nodejs runtime environment
- Redis for caching

## Installation

App requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and start the server.

```sh
cd basiccrud
npm i
npm start
```

## Docker

App is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd basiccrud
docker-compose up
```

This will create the app image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of app.

Once done, run the Docker image and map the port to whatever you wish on
your host.

## License

MIT
