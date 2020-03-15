'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listVodEvent = async (args) => {
    try {
        const query = {
                limit: args.limit || CONSTANTS.DEFAULT_LIMIT,
                offset: args.offset || CONSTANTS.DEFAULT_OFFSET,
                where: {}
            },
            vodEvents = await db.vodEvent.findAndCountAll(query);

        return urlUtils.formatListResponse(vodEvents, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};