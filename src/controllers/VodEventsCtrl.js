'use strict';

const router = require('express').Router();

router.get('/vod-events', async (req, res, next) => {
    try {
        const service = require('../services/list-vod-event.service'),
            response = await service.listVodEvent(req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.post('/vod-events', async (req, res, next) => {
    try {
        const service = require('../services/create-vod-event.service'),
            response = await service.createVodEvent(req && req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/vod-events/:id', async (req, res, next) => {
    try {
        const service = require('../services/get-vod-event.service'),
            response = await service.getVodEvent(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.put('/vod-events/:id', async (req, res, next) => {
    try {
        const service = require('../services/update-vod-event.service'),
            response = await service.updateVodEvent(req && req.params && req.params.id, req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.delete('/vod-events/:id', async (req, res, next) => {
    try {
        const service = require('../services/delete-vod-event.service'),
            response = await service.deleteVodEvent(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
