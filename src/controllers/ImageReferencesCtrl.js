'use strict';

const router = require('express').Router();

router.get('/image-references', async (req, res, next) => {
    try {
        const service = require('../services/list-image-reference.service'),
            response = await service.listImageReference(req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.post('/image-references', async (req, res, next) => {
    try {
        const service = require('../services/create-image-reference.service'),
            response = await service.createImageReference(req && req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/image-references/:id', async (req, res, next) => {
    try {
        const service = require('../services/get-image-reference.service'),
            response = await service.getImageReference(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.put('/image-references/:id', async (req, res, next) => {
    try {
        const service = require('../services/update-image-reference.service'),
            response = await service.updateImageReference(req && req.params && req.params.id, req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.delete('/image-references/:id', async (req, res, next) => {
    try {
        const service = require('../services/delete-image-reference.service'),
            response = await service.deleteImageReference(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
