'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.deleteFavoriteContent = async (args) => {
    try {
        if (!args) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const query = {
            where: {}
        };

        if (args) {
            if (args.userId) {
                query.where.userId = args.userId;
            }

            if (args.contentId) {
                query.where.contentId = args.contentId;
            }
        }

        return db.favoriteContent.destroy(query);
    } catch (err) {
        throw err;
    }
};
