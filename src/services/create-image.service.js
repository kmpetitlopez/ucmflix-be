'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.createImage = async (body) => {
    try {
        if (!body) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const image = await db.image.create(body);

        return image.get({plain: true});
    } catch (err) {
        let httpError = err;

        switch (err.name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
        case 'SequelizeForeignKeyConstraintError':
        case 'SequelizeDatabaseError':
            httpError = new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.VALIDATION_ERROR
            }));
            break;
        default:
            break;
        }

        throw httpError;
    }
};
