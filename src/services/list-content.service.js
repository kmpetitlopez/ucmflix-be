'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listContent = async (args) => {
    try {
        const query = {
                limit: args.limit || CONSTANTS.DEFAULT_LIMIT,
                offset: args.offset || CONSTANTS.DEFAULT_OFFSET,
                where: {}
            },
            contents = await db.content.findAndCountAll(query);

        return urlUtils.formatListResponse(contents, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
