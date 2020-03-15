'use strict';

const router = require('express').Router();

router.get('/images', async (req, res, next) => {
    try {
        const service = require('../services/list-image.service'),
            response = await service.listImage(req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.post('/images', async (req, res, next) => {
    try {
        const service = require('../services/create-image.service'),
            response = await service.createImage(req && req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/images/:id', async (req, res, next) => {
    try {
        const service = require('../services/get-image.service'),
            response = await service.getImage(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.put('/images/:id', async (req, res, next) => {
    try {
        const service = require('../services/update-image.service'),
            response = await service.updateImage(req && req.params && req.params.id, req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.delete('/images/:id', async (req, res, next) => {
    try {
        const service = require('../services/delete-image.service'),
            response = await service.deleteImage(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
