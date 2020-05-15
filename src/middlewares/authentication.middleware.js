'use strict';

const urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

module.exports = (req, res, next) => {
    const isAuth = urlUtils.isAuthUrl(req.url);

    if (isAuth || req.isAuthenticated()) {
        next();
    } else {
        res.status(CONSTANTS.HTTP_ERROR_CODES.UNAUTHORIZED)
            .send(CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED);
    }
};
