'use strict';

const router = require('express').Router();

router.get('/categories', async (req, res, next) => {
    try {
        const service = require('../services/list-category.service'),
            response = await service.listCategory(req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.post('/categories', async (req, res, next) => {
    try {
        const service = require('../services/create-category.service'),
            response = await service.createCategory(req && req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/categories/:id', async (req, res, next) => {
    try {
        const service = require('../services/get-category.service'),
            response = await service.getCategory(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.put('/categories/:id', async (req, res, next) => {
    try {
        const service = require('../services/update-category.service'),
            response = await service.updateCategory(req && req.params && req.params.id, req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.delete('/categories/:id', async (req, res, next) => {
    try {
        const service = require('../services/delete-category.service'),
            response = await service.deleteCategory(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/categories/:id/contents', async (req, res, next) => {
    try {
        const service = require('../services/list-category-contents.service'),
            response = await service.listCategoryContents(req && req.params && req.params.id, req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
