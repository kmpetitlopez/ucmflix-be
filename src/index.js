'use strict';
require('dotenv').config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    url = require('url'),
    routes = require('./controllers/routes'),
    errorHandler = require('./middlewares/errorHandler.middleware'),
    logger = require('./middlewares/logger.middleware'),
    CONSTANTS = require('./common/constants');

app.listen(3000, () => {
    console.log('App listening on port 3000');
});

app.use(cors());
app.use(bodyParser.json());
app.use(logger);
app.use((req, res, next) => {
    if (req && req.query) {
        const URL = url.parse(req.url);

        req.query.endpoint = URL && URL.pathname;
        req.query.limit = (req.query.limit && parseInt(req.query.limit)) || CONSTANTS.DEFAULT_LIMIT;
        req.query.offset = (req.query.offset && parseInt(req.query.offset)) || CONSTANTS.DEFAULT_OFFSET;
    }

    next();
});

app.use('/', routes);
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(errorHandler);

