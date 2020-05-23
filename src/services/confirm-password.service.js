'use strict';

const db = require('ucmflix-db'),
    moment = require('moment'),
    encryptedUtils = require('../helpers/encrypt'),
    CONSTANTS = require('../common/constants');

exports.confirmPassword = async(body, res, next) => {
    try {
        if (!body || body.password !== body.repeatedPassword || !body.token) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const {username, tokenDate} = encryptedUtils.decrypt(body.token,
                process.env.AUTHENTICATION_CREDENTIALS_PASSPHRASE),
            user = await db.user.findOne({
                where: {
                    username
                }
            });

        if (moment.utc(tokenDate).isBefore(moment.utc())) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.EXPIRED_TOKEN
            }));
        }

        if (user) {
            user.password = body.password.toString();
            user.confirmedAt = moment.utc();

            await user.save();
        } else {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }
    } catch (err) {
        throw err;
    }
};
