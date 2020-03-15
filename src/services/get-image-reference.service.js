'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.getImageReference = async (id) => {
    try {
        if (!id) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const imageReference = await db.imageReference.findByPk(parseInt(id));

        if (!imageReference) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        return imageReference.get({plain: true});
    } catch (err) {
        throw err;
    }
};
