'use strict';
require('dotenv').config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cookieSession = require('cookie-session'),
    routes = require('./controllers/routes'),
    authHelper = require('./helpers/auth'),
    authenticationMiddleware = require('./middlewares/authentication.middleware'),
    errorHandlerMiddleware  = require('./middlewares/errorHandler.middleware'),
    prepareRequestMiddleware  = require('./middlewares/prepareRequest.middleware'),
    permissionMiddleware  = require('./middlewares/permission.middleware'),
    loggerMiddleware  = require('./middlewares/logger.middleware');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieSession({
    name: process.env.COOKIE_NAME,
    secret: process.env.COOKIE_SECRET,
    maxAge: process.env.COOKIE_MAX_AGE,
}));
app.use(authHelper.initialize());
app.use(authHelper.session());
app.use(loggerMiddleware);
app.use(prepareRequestMiddleware);
app.use(authenticationMiddleware);
app.use(permissionMiddleware);

app.use('/', routes);
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});

