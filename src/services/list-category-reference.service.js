'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listCategoryReference = async (args) => {
    try {
        const query = {
                limit: args.limit || CONSTANTS.DEFAULT_LIMIT,
                offset: args.offset || CONSTANTS.DEFAULT_OFFSET,
                where: {}
            },
            categoryReferences = await db.categoryReference.findAndCountAll(query);

        return urlUtils.formatListResponse(categoryReferences, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
