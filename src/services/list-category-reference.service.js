'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listCategoryReference = async (args = {}) => {
    try {
        const query = {
            limit: args.limit,
            offset: args.offset,
            where: {}
        };

        if (args.categoryId) {
            query.where.categoryId = args.categoryId;
        }

        if (args.contentId) {
            query.where.contentId = args.contentId;
        }

        const categoryReferences = await db.categoryReference.findAndCountAll(query);

        return urlUtils.formatListResponse(categoryReferences, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
