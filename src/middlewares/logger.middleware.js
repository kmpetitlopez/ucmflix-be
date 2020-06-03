'use strict';

const _ = require('underscore');

module.exports = (req, res, next) => {
    const hasBody = req && req.body && !_.isEmpty(req.body),
        hasQuery = req && req.query && !_.isEmpty(req.query);
    let initialLog = `authorized API request. [action=${req.method} ${req.url}] [user=${req && req.user && req.user.username}]`;

    if (hasQuery) {
        initialLog += `[query=${JSON.stringify(req.query)}] `;
    }

    if (hasBody) {
        const body = _.clone(req.body);
        delete body.password;
        delete body.repeatedPassword;

        initialLog += `[body=${JSON.stringify(body)}] `;
    }

    console.log(initialLog);
    
    return next();
};
