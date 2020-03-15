'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listAsset = async (args) => {
    try {
        const query = {
                limit: args.limit || CONSTANTS.DEFAULT_LIMIT,
                offset: args.offset || CONSTANTS.DEFAULT_OFFSET,
                where: {}
            },
            assets = await db.asset.findAndCountAll(query);

        return urlUtils.formatListResponse(assets, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
