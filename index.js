const debug = require('debug')('Node:Server');
const http = require('http');

// const https = require('https');
// const fs = require('fs');

// const httpsOptions = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

require('dotenv').config();

const app = require('./app');
const { redisConnect } = require('./app/db/redisClient');
const { pgConnect } = require('./app/db/pgPool');

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
console.log('process.env.NODE_ENV = ', process.env.NODE_ENV);

const server = http.createServer(app);

// I need the databases to be connected to my http server before doing queries :
// First we connect the pg Pool of clients
pgConnect().then(() => {
    // Secondly we connect the redis client
    redisConnect().then(() => {
        // Then we start the server after the databases are connected
        server.listen(PORT, () => {
            debug(`✅ Server listening on http://localhost:${PORT} ✅`);
        });
    });
});
