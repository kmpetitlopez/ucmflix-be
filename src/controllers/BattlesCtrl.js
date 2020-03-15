'use strict';

const BattlesCtrl = require('./BattlesCtrlService'),
    router = require('express').Router();

router.get('/', (req, res, next) => {
    console.log('aaaa');
});
module.exports = router;
