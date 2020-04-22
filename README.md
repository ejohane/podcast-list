# Podcast List

Podcast List is a simple web site to search for podcasts by name.

**In order to use this application you must have a spotify account. You can sign up for a free account here https://www.spotify.com/us/signup** 

## Design

The repository is split into three modules: the api, the app, and the models library. The api is built with [ExpressJS](https://expressjs.com/) and utilizes the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to query podcasts. The frontend is written in [React](https://reactjs.org/) and communicates with the api backend for querying data. Both the frontend and backend use the models library to share data types.

## Runing the Application

The easiest way to run the application is by running docker compose from the root directory.

    docker-compose up

Additionally, the frontend and backend can be started individually from their directories (`./app` & `./api`) by running the npm start script.

    npm run start   

By default the app is available at http://localhost:3000 and the api is available at http://localhost:8081


