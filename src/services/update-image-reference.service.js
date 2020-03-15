'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.updateImageReference = async (id, body) => {
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

        if (body.imageId) {
            const image = await db.image.findByPk(body.imageId);

            if (!image) {
                throw new Error(JSON.stringify({
                    code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                    message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
                }));
            }
        }

        const imageReference = await db.imageReference.findByPk(parseInt(id));

        if (!imageReference) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        await imageReference.update(body);
        await imageReference.reload();

        return imageReference.get({plain: true});
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
