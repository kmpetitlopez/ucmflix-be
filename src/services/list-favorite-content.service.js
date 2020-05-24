'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listFavoriteContent = async (args) => {
    try {
        const query = {
            limit: args.limit,
            offset: args.offset,
            where: {},
            include: [db.content]
        };

        if (args && args.userId) {
            query.where.userId = args.userId;
        }

        if (args && args.contentId) {
            query.where.contentId = args.contentId;
        }

        const favoriteContents = await db.favoriteContent.findAndCountAll(query);

        return urlUtils.formatListResponse(favoriteContents, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
