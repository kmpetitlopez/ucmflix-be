'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants');

exports.listContentVodEvents = async (id, args) => {
    try {
        if (!id) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const query = {
                limit: args.limit || CONSTANTS.DEFAULT_LIMIT,
                offset: args.offset || CONSTANTS.DEFAULT_OFFSET,
                where: {
                    contentId: id
                }
            },
            content = await db.content.findByPk(id);

        if (!content) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        // eslint-disable-next-line one-var
        const contentVodEvents = await db.vodEvent.findAndCountAll(query);

        return urlUtils.formatListResponse(contentVodEvents, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
