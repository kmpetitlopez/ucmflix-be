'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listImage = async (args) => {
    try {
        const query = {
                limit: args.limit || CONSTANTS.DEFAULT_LIMIT,
                offset: args.offset || CONSTANTS.DEFAULT_OFFSET,
                where: {}
            },
            images = await db.image.findAndCountAll(query);

        return urlUtils.formatListResponse(images, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
