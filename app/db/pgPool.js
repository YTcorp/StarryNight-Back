/* eslint-disable no-console */
const debug = require('debug')('db:pgPool');

// Rather than created and connected a Client, we will create a "pool" of client and let our module manage
// the connections of several clients depending on the needs

// The Pool will be able to do several queries at the same time providing a faster access to the database
const { Pool } = require('pg');

const config = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === 'production') {
    // This is a special configuration for the Heroku production version
    // It will avoid errors messages concerning the SSL
    config.ssl = {
        rejectUnauthorized: false,
    };
}

const pool = new Pool(config);

const pgConnect = async () => {
    try {
        await pool.connect();
        debug('pgPool connected');
    } catch (error) {
        debug(`pgPool ERROR => ${error}`);
    }
};

// pool.connect((err) => (err ? debug(`ERREUR :::::: ${err}`) : debug('pgPool Connected')));

module.exports = {
    // We expose the original client just in case
    originalClient: pool,
    pgConnect,
    // This method will intercept the queries in order to display them in the terminal with debug to be able to track
    // the queries. The spread operator transform several variables, that are passed in parameter, into an array
    async query(...params) {
        debug('SQL === ', ...params);
        // The spread operator does the exact opposite and transform an array into a list of variable in parameter
        // So the query method of the client will be called exactly the same way as our module
        return this.originalClient.query(...params);
    },
};
