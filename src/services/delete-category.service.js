'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.deleteCategory = async (id) => {
    try {
        if (!id) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const category = await db.category.findByPk(parseInt(id));

        if (!category) {
            throw new Error({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            });
        }

        return category.destroy();
    } catch (err) {
        throw err;
    }
};
