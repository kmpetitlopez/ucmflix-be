'use strict';

const router = require('express').Router();

router.get('/assets', async (req, res, next) => {
    try {
        const service = require('../services/list-asset.service'),
            response = await service.listAsset(req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.post('/assets', async (req, res, next) => {
    try {
        const service = require('../services/create-asset.service'),
            response = await service.createAsset(req && req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/assets/:id', async (req, res, next) => {
    try {
        const service = require('../services/get-asset.service'),
            response = await service.getAsset(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.put('/assets/:id', async (req, res, next) => {
    try {
        const service = require('../services/update-asset.service'),
            response = await service.updateAsset(req && req.params && req.params.id, req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.delete('/assets/:id', async (req, res, next) => {
    try {
        const service = require('../services/delete-asset.service'),
            response = await service.deleteAsset(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
