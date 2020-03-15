'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listCategory = async (args) => {
    try {
        const query = {
                limit: args.limit || CONSTANTS.DEFAULT_LIMIT,
                offset: args.offset || CONSTANTS.DEFAULT_OFFSET,
                where: {}
            },
            categorys = await db.category.findAndCountAll(query);

        return urlUtils.formatListResponse(categorys, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
