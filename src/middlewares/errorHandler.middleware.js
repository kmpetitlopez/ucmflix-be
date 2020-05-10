'use strict';

module.exports = (err, req, res, next) => {
    let error;

    console.error(`Error on [action=${req.method} ${req.url}] [params=${JSON.stringify(req.params)}] ` +
        `[query=${JSON.stringify(req.query)}] [body=${JSON.stringify(req.body)}] ` +
        `[err=${err.message}]`);

    try {
        error = JSON.parse(err.message);
        res.status(error.code).send(error.message);
    } catch (e) {
        res.status(500).send();
    }
};
