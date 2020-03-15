'use strict';

const Contents = require('./ContentsCtrl'),
    router = require('express').Router();

router.use('/', Contents);

module.exports = router;
