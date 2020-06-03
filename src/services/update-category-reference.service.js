'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.updateCategoryReference = async (id, body) => {
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

        if (body.categoryId) {
            const category = await db.category.findByPk(body.categoryId);

            if (!category) {
                throw new Error(JSON.stringify({
                    code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                    message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
                }));
            }
        }

        const categoryReference = await db.categoryReference.findByPk(parseInt(id));

        if (!categoryReference) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        await categoryReference.update(body);
        await categoryReference.reload();

        return categoryReference.get({plain: true});
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
