'use strict';

const await = require('asyncawait/await'),
    async = require('asyncawait/async'),
    db = require('../models/index')();

exports.getBattles = async((args) => {
    try {
        // validate if all the necessary args are provided if not return error
        // how to return error ->   throw new Error('Whoops!');

        // how to search in db -> db.battle.findAll({})

        /*
            Example:
            let battles = db.battle.findAll({});

            if (!battles) {
                throw new Error('Unknonw value');
            } else {
                Do something

                return battles
            }
        */
    } catch (err) {
        console.log(err);
        throw err;
    }
});
