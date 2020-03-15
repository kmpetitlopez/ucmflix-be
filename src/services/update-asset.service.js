'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.updateAsset = async (id, body) => {
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

        const asset = await db.asset.findByPk(parseInt(id));

        if (!asset) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        await asset.update(body);
        await asset.reload();

        return asset.get({plain: true});
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
