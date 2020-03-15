'use strict';

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    routes = require('./controllers/routes');

app.listen(3000, () => {
    console.log('App listening on port 3000');
});

app.use(cors());

app.use('/videos', express.static( path.join(__dirname, 'videos')));

app.use(bodyParser.json());
app.use('/', routes);
