const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./routers');

const { homeController } = require('./controllers');

// Creation of an express application
const app = express();
// Providing the application to express-jsdoc-swagger to generate a documentation of the API
require('./helpers/apiDocs')(app);
// Setting 'pug' as the view engine that will generate the HTML of the backoffice
app.set('view engine', 'pug');
// Setting the directory where pug's views are located
app.set('views', path.join(__dirname, 'views'));
// Middleware defining the static directory providing direct access to datas (images, css, js)
app.use(express.static('./static', { dotfiles: 'allow' }));

// Specify CORS policy : needed to be able to call the app from another origin with fetch
// Exposing the header “Authorization” that will be needed to get back the authentification token on the front side
const corsOptions = {
    exposedHeaders: ['Authorization'],
    origin: '*', // " * " Allows all origins
    // To get more restriction, we can put something like : origin: 'http://localhost:3000/'
};

app.use(cors(corsOptions));
// Parsing the urlencoded payload to get req.body with data inside
app.use(express.urlencoded({ extended: true }));
// Parsing the JSON payload to get req.body with data inside
app.use(express.json());

app.get('/', homeController.home);

app.use('/v1', router);

module.exports = app;
