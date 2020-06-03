'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.updateContent = async (id, body) => {
    try {
        if (!body || !id) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const content = await db.content.findByPk(parseInt(id));

        if (!content) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        await content.update(body);
        await content.reload();

        return content.get({plain: true});
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
