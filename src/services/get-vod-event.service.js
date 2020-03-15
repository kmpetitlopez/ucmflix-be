'use strict';

const db = require('ucmflix-db'),
    CONSTANTS = require('../common/constants');

exports.getVodEvent = async (id) => {
    try {
        if (!id) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const vodEvent = await db.vodEvent.findByPk(parseInt(id));

        if (!vodEvent) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        return vodEvent.get({plain: true});
    } catch (err) {
        throw err;
    }
};
