'use strict';

const router = require('express').Router();

router.get('/category-references', async (req, res, next) => {
    try {
        const service = require('../services/list-category-reference.service'),
            response = await service.listCategoryReference(req && req.query);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.post('/category-references', async (req, res, next) => {
    try {
        const service = require('../services/create-category-reference.service'),
            response = await service.createCategoryReference(req && req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.get('/category-references/:id', async (req, res, next) => {
    try {
        const service = require('../services/get-category-reference.service'),
            response = await service.getCategoryReference(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.put('/category-references/:id', async (req, res, next) => {
    try {
        const service = require('../services/update-category-reference.service'),
            response = await service.updateCategoryReference(req && req.params && req.params.id, req.body);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

router.delete('/category-references/:id', async (req, res, next) => {
    try {
        const service = require('../services/delete-category-reference.service'),
            response = await service.deleteCategoryReference(req && req.params && req.params.id);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response}));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
