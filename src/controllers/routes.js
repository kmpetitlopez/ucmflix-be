'use strict';

const Auth = require('./AuthCtrl'),
    Contents = require('./ContentsCtrl'),
    Categories = require('./CategoriesCtrl'),
    CategoryReferences = require('./CategoryReferencesCtrl'),
    VodEvents = require('./VodEventsCtrl'),
    Images = require('./ImagesCtrl'),
    FavoriteContents = require('./FavoriteContentsCtrl'),
    router = require('express').Router();

router.use('/', Auth);
router.use('/', Contents);
router.use('/', Categories);
router.use('/', CategoryReferences);
router.use('/', VodEvents);
router.use('/', Images);
router.use('/', FavoriteContents);

module.exports = router;
