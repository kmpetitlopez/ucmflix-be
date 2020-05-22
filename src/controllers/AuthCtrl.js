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

router.get('/auth/logout', (req, res) => {
    req.logout();
    res.send(CONSTANTS.SUCCESS_MESSAGES.LOGGED_OUT);
});

router.post('/auth/sing-up', async (req, res, next) => {
    try {
        const service = require('../services/create-user.service'),
            response = await service.createUser(req && req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.post('/auth/confirm-password', async (req, res, next) => {
    try {
        const service = require('../services/confirm-password.service'),
            response = await service.confirmPassword(req && req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.post('/auth/request-password-recovery', async (req, res, next) => {
    try {
        const service = require('../services/request-password-recovery.service'),
            response = await service.requestPasswordRecovery(req && req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
