'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listImageReference = async (args) => {
    try {
        const query = {
                limit: args.limit || CONSTANTS.DEFAULT_LIMIT,
                offset: args.offset || CONSTANTS.DEFAULT_OFFSET,
                where: {}
            },
            imageReferences = await db.imageReference.findAndCountAll(query);

        return urlUtils.formatListResponse(imageReferences, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
