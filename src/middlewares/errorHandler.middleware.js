'use strict';

const CONSTANTS = require('../common/constants');

module.exports = (err, req, res, next) => {
    let error;

    console.error(`Error on [action=${req.method} ${req.url}] [params=${JSON.stringify(req.params)}] ` +
        `[query=${JSON.stringify(req.query)}] [body=${JSON.stringify(req.body)}] ` +
        `[err=${err.message}]`);

    try {
        error = JSON.parse(err.message);
        res.status(error.code).send(error.message);
    } catch (e) {
        res.status(CONSTANTS.HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR)
            .send(CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
