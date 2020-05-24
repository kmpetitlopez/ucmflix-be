'use strict';

const url = require('url'),
    CONSTANTS = require('../common/constants');

module.exports = (req, res, next) => {
    if (req && req.query) {
        const URL = url.parse(req.url);

        req.query.endpoint = URL && URL.pathname;
        req.query.limit = (req.query.limit && parseInt(req.query.limit)) || CONSTANTS.DEFAULT_LIMIT;
        req.query.offset = (req.query.offset && parseInt(req.query.offset)) || CONSTANTS.DEFAULT_OFFSET;
        req.query.userId = req && req.user && req.user.id;
    }

    next();
};
