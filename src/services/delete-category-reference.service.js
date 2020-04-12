'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.deleteCategoryReference = async (args) => {
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
            if (args.categoryId) {
                query.where.categoryId = args.categoryId;
            }

            if (args.contentId) {
                query.where.contentId = args.contentId;
            }
        }

        return db.categoryReference.destroy(query);
    } catch (err) {
        throw err;
    }
};
