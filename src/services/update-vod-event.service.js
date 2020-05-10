'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.updateVodEvent = async (id, body) => {
    try {
        if (!body || !id) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        if (body.contentId) {
            const content = await db.content.findByPk(body.contentId);

            if (!content) {
                throw new Error(JSON.stringify({
                    code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                    message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
                }));
            }
        }

        const vodEvent = await db.vodEvent.findByPk(parseInt(id));

        if (!vodEvent) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        await vodEvent.update(body);
        await vodEvent.reload();

        return vodEvent.get({plain: true});
    } catch (err) {
        let httpError = err;

        switch (err.name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
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
