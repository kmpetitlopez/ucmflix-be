'use strict';

exports.getBattles = (req, res, next) => {
    /**
     * Battles
     **/
    const service = require('../services/get-battles.service');

    service.getBattles(req.query)
        .then((response) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({response}));
        })
        .catch((err) => {
            console.log(`Error on getAlertsStatistics [Error = ${err.toString()}]`);
            return next(err);
        });
};

exports.createBattles = (req, res, next) => {
    /**
     * Battles
     **/
    res.end();
};

exports.updateBattles = (req, res, next) => {
    /**
     * Battles
     **/
    res.end();
};

exports.deleteBattles = (req, res, next) => {
    /**
     * Battles
     **/
    res.end();
};
