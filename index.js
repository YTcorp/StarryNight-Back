const debug = require('debug')('Express:Server');
// const http = require('http');

const https = require('https');
const fs = require('fs');

const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

require('dotenv').config();

const app = require('./app');
const redisClient = require('./app/db/redisClient');

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
console.log('process.env.NODE_ENV = ', process.env.NODE_ENV);

const server = https.createServer(httpsOptions, app);

// I need my redis client to be connected to my http server before doing queries, so I use then. We use a pool
// with pg, we could do the same but it's okay to let it like that. For a Client pg we should do it to.
redisClient.connect().then(() => {
    server.listen(PORT, () => {
        debug(`✅ Server listening on https://localhost:${PORT} ✅`);
    });
});
