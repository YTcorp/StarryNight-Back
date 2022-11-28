# Starry Night - Back-End

## API that provide json for A single page application to get a glimpse to constellations reachable at your location

Enter a postal adress and get to see what's on the sky over that spot. See the constellation trace, and know a little more about its story and myth.

## To install

`npm install` to get all dependencies.

Attention de bien installer la version 2 de node-fetch car la dernière version nécessite la syntaxe "import" qui ne sera pas compatible avec le reste de l'app.

```s
npm node-fetch@2
```

## To connect to DB

Verify you have installed PostgreSQL.

Copy the .env.exemple file to .env and fill the values:

- choice a url for the API_DOCUMENTATION_ROUTE.
- set a DB locally and create a USER and a Password so you can enter the DATABASE_URL
- get a key from Position Stack
- choice a string for JWTOKEN_KEY

### Create the DB

Install, if needed, sqitch.

Copy the sqitch.conf.exemple into sqitch.conf

```sqitch deploy```

### Seed the DB

```node ./data/2-importData-Yann.js```

Note: if necessary, set the dates on testEvents.json to any ulterior date.

## Connect to Redis

Verify you have installed Redis and service is started.

## Run the app

`npm run dev` to run in dev mode
`npm start` to run the API server

## Check the swagger docs

Get to [Starry Nights UI Swagger docs](http://localhost:3001/api-docs/) to see all the routes availables and their reponses.
