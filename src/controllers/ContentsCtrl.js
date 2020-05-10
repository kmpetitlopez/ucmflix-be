'use strict';

const router = require('express').Router();

router.get('/contents', async (req, res, next) => {
    try {
        const service = require('../services/list-content.service'),
            response = await service.listContent(req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.post('/contents', async (req, res, next) => {
    try {
        const service = require('../services/create-content.service'),
            response = await service.createContent(req && req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/contents/empty-categories', async (req, res, next) => {
    try {
        const service = require('../services/list-content-empty-categories.service'),
            response = await service.listContentWithoutCategories(req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/contents/:id', async (req, res, next) => {
    try {
        const service = require('../services/get-content.service'),
            response = await service.getContent(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.put('/contents/:id', async (req, res, next) => {
    try {
        const service = require('../services/update-content.service'),
            response = await service.updateContent(req && req.params && req.params.id, req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.delete('/contents/:id', async (req, res, next) => {
    try {
        const service = require('../services/delete-content.service'),
            response = await service.deleteContent(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/contents/:id/categories', async (req, res, next) => {
    try {
        const service = require('../services/list-content-categories.service'),
            response = await service.listContentCategories(
                req && req.params && req.params.id,
                req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/contents/:id/vod-events', async (req, res, next) => {
    try {
        const service = require('../services/list-content-vod-events.service'),
            response = await service.listContentVodEvents(
                req && req.params && req.params.id,
                req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/contents/:id/episodes', async (req, res, next) => {
    try {
        const service = require('../services/list-content-episodes.service'),
            response = await service.listContentEpisodes(
                req && req.params && req.params.id,
                req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/contents/:id/seasons', async (req, res, next) => {
    try {
        const service = require('../services/list-content-seasons.service'),
            response = await service.listContentSeasons(
                req && req.params && req.params.id,
                req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/contents/:id/image', async (req, res, next) => {
    try {
        const service = require('../services/list-content-images.service'),
            response = await service.listContentImages(
                req && req.params && req.params.id,
                req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
