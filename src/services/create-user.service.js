'use strict';

const _ = require('underscore'),
    db = require('ucmflix-db'),
    moment = require('moment'),
    urlUtils = require('../common/urlUtils'),
    MailComposer = require('../helpers/mailComposer'),
    encryptedUtils = require('../helpers/encrypt'),
    CONSTANTS = require('../common/constants');

exports.createUser = async(body, res, next) => {
    try {
        if (!body) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const role = await db.role.findOne({
                where: {
                    name: body.role || CONSTANTS.PERMISSIONS.USER
                }}),
            sameUsername = await db.user.findOne({
                where: {
                    username: body.username
                }}),
            sameEmail = await db.user.findOne({
                where: {
                    email: body.email
                }});

        if (!role) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        if (sameUsername || sameEmail) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.USER_ALREADY_EXIST
            }));
        }
        
        body.roleId = role.id;
        delete body.role;
        delete body.confirmedAt;

        const user = await db.user.create(body);

        if (user) {
            const token = encryptedUtils.encrypt({
                        username: user.username,
                        tokenDate: moment.utc().add(2, 'hours').format()
                    },
                    process.env.AUTHENTICATION_CREDENTIALS_PASSPHRASE),
                mail = await MailComposer.welcomeEmail(
                    user.username,
                    urlUtils.buildFEUrl('/password-confirmation', {token})
                );

            mail.destination = user.email;

            await mail.send();

            return urlUtils.pruneUserProperties(user.get({plain: true}));
        } else {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR,
                message: CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR
            }));
        }
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
