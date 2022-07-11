const debug = require('debug')('db:Redis');
const { createClient } = require('redis');

const rdClient = createClient();

const redisConnect = async () => {
    try {
        await rdClient.connect();
        debug('RedisClient connected');
    } catch (error) {
        debug(`RedisClient ERROR => ${error}`);
    }
};

module.exports = {
    redisConnect,
    rdClient,
};
