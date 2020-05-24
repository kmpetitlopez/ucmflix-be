'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.createFavoriteContent = async (body, userId) => {
    try {
        if (!body) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const content = await db.content.findByPk(body.contentId),
            user = await db.user.findByPk(userId);

        if (!content || !user) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        body.userId = userId;

        const favoriteContent = await db.favoriteContent.create(body);

        return favoriteContent.get({plain: true});
    } catch (err) {
        throw err;
    }
};
