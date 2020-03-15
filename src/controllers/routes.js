'use strict';

const Battles = require('./BattlesCtrl'),
    router = require('express').Router();

router.use('/', Battles);

module.exports = router;
