'use strict';

const db = require('ucmflix-db'),
    moment = require('moment'),
    encryptedUtils = require('../helpers/encrypt'),
    urlUtils = require('../common/urlUtils'),
    MailComposer = require('../helpers/mailComposer'),
    CONSTANTS = require('../common/constants');

exports.requestPasswordRecovery = async(body) => {
    try {
        if (!body) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const user = await db.user.findOne({where: {email: body.email}});

        if (user) {
            const token = encryptedUtils.encrypt({
                    username: user.username,
                    tokenDate: moment.utc().add(2, 'hours').format()
                },
                process.env.AUTHENTICATION_CREDENTIALS_PASSPHRASE),
                mail = await MailComposer.resetPasswordEmail(
                    user.username,
                    urlUtils.buildFEUrl('/password-confirmation', {token})
                );

            user.confirmedAt = null;
            mail.destination = user.email;

            await user.save();
            await mail.send();
        } else {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }
    } catch (err) {
        throw err;
    }
};
