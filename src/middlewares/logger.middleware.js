'use strict';

module.exports = (req, res, next) => {
    console.log(req)
    console.log(`authorized API request. [action=${req.method} ${req.url}] [params=${JSON.stringify(req.params)}] ` +
    `[query=${JSON.stringify(req.query)}] [body=${JSON.stringify(req.body)}] ` );

    return next();
};
