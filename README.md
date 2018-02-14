# React App with SWAPI (Star Wars API)
Required node version is `9.2.1`. This project is based on [Node API and Client Boilerplate](https://github.com/rickyhurtado/node-api-and-client-boilerplate).

## Star Wars API

The [Star Wars API](https://swapi.co/) is the world's first quantified and programmatically-formatted set of Star Wars data.

## Starting the Client App

Open a terminal console and go to the project directory then run the following commands:

```
yarn
yarn start
```

Note: See **Bash Commands** section for Docker.

To generate the `./src/Assets/Styles/Style.css`, open another terminal console and go to the project directory then run the following command:

```
yarn run watch-css
```

The command above works only in Mac with the `fsevents` module installed. Run the command below as an alternative:

```
yarn run build-css
```

Note: You must run the command above manually everytime you made changes to `.scss` files.  All the `*.scss` files shall be compiled to `*.css` but only the `Style.css` is included in the repository.

Access the app at <http://localhost:7771>.

## Docker

Download and install the [Docker Community Edition](https://www.docker.com/community-edition).

Note: See **Bash Commands** section for Docker.

The `yarn run watch-css` command should be running on a separate terminal console.

## Bash Commands

From the `root` directory of the project, run the following commands:

Note: To view the Docker containers, open another terminal then enter `docker ps`.

### Docker

| Command                                | Description                                     |
|----------------------------------------|-------------------------------------------------|
| `./bin/install`                        | Build the Docker container                      |
| `./bin/start`                          | Build and run the client                        |
| `./bin/stop`                           | Stop the service                                |
| `./bin/console <container ID or Name>` | Access the terminal console of client container |

### CSS

| Command           | Description                                                         |
|-------------------|---------------------------------------------------------------------|
| `./bin/css/watch` | Watch and compile *.scss files on file changes (for Mac users only) |
| `./bin/css/build` | Manually compile *.scss files                                       |
