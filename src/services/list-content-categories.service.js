'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listContentCategories = async (id, args) => {
    try {
        if (!id) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const query = {
                limit: args.limit,
                offset: args.offset,
                where: {
                    contentId: id
                },
                include: [db.category]
            },
            content = await db.content.findByPk(id);

        if (!content) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        // eslint-disable-next-line one-var
        const contentCategories = await db.categoryReference.findAndCountAll(query);

        return urlUtils.formatListResponse(contentCategories, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
