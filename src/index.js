'use strict';
require('dotenv').config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    routes = require('./controllers/routes'),
    errorHandler = require('./middlewares/errorHandler.middleware'),
    logger = require('./middlewares/logger.middleware');

app.listen(3000, () => {
    console.log('App listening on port 3000');
});

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use('/', routes);
app.use('/static', express.static( path.join(__dirname, 'static')));

app.use(errorHandler);

