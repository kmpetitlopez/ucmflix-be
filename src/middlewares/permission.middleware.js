'use strict';

const urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

module.exports = (req, res, next) => {
    const userRole = req && req.user && req.user.role && req.user.role.name,
        methodsForRole = CONSTANTS.ALLOWED_METHODS[userRole],
        method = req && req.method,
        isAuth = urlUtils.isAuthUrl(req && req.url),
        isAllowed = methodsForRole && methodsForRole.indexOf(method) > -1,
        isSpecialEndPoint = req && req.query && req.query.endpoint &&
            CONSTANTS.SPECIAL_END_POINTS.indexOf(req.query.endpoint) > -1;

    if (isAuth || isAllowed || isSpecialEndPoint) {
        next();
    } else {
        res.status(CONSTANTS.HTTP_ERROR_CODES.FORBIDDEN)
            .send(CONSTANTS.ERROR_MESSAGES.FORBIDDEN);
    }
};
