'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.listContentImages = async (id, args) => {
    try {
        if (!id) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const content = await db.content.findByPk(id, {
            include: [db.image]
        });

        if (!content) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        return content.image;
    } catch (err) {
        throw err;
    }
};