'use strict';

const router = require('express').Router(),
    passport = require('passport'),
    CONSTANTS = require('../common/constants');

router.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }
        
        if (!user) {
            return res.status(CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST)
                .send(CONSTANTS.ERROR_MESSAGES.CANNOT_LOG_IN);
        }

        req.login(user, () => {
            res.send(CONSTANTS.SUCCESS_MESSAGES.LOGGED_IN);
        })
    })(req, res, next)
})

router.get('/auth/logout', function(req, res){
    req.logout();
    res.send(CONSTANTS.SUCCESS_MESSAGES.LOGGED_OUT);
});

module.exports = router;
