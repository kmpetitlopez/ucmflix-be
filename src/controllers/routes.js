'use strict';

const Contents = require('./ContentsCtrl'),
    Categories = require('./CategoriesCtrl'),
    CategoryReferences = require('./CategoryReferencesCtrl'),
    VodEvents = require('./VodEventsCtrl'),
    Images = require('./ImagesCtrl'),
    router = require('express').Router();

router.use('/', Contents);
router.use('/', Categories);
router.use('/', CategoryReferences);
router.use('/', VodEvents);
router.use('/', Images);

module.exports = router;
