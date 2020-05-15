'use strict';

const Auth = require('./AuthCtrl'),
    Contents = require('./ContentsCtrl'),
    Categories = require('./CategoriesCtrl'),
    CategoryReferences = require('./CategoryReferencesCtrl'),
    VodEvents = require('./VodEventsCtrl'),
    Images = require('./ImagesCtrl'),
    router = require('express').Router();

router.use('/', Auth);
router.use('/', Contents);
router.use('/', Categories);
router.use('/', CategoryReferences);
router.use('/', VodEvents);
router.use('/', Images);

module.exports = router;
