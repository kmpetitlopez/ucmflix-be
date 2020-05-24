'use strict';

const router = require('express').Router();

router.get('/favorite-contents', async (req, res, next) => {
    try {
        const service = require('../services/list-favorite-content.service'),
            response = await service.listFavoriteContent(req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.post('/favorite-contents', async (req, res, next) => {
    try {
        const service = require('../services/create-favorite-content.service'),
            response = await service.createFavoriteContent(req && req.body,
                req && req.query && req.query.userId);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.delete('/favorite-contents', async (req, res, next) => {
    try {
        const service = require('../services/delete-favorite-content.service'),
            response = await service.deleteFavoriteContent(req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
