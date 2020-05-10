'use strict';

const db = require('ucmflix-db'),
    COMMON_CONSTANTS = require('ucmflix-db').constants,
    moment = require('moment'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants'),
    {Op} = require('sequelize');

exports.listContentSeasons = async (id, args) => {
    try {
        if (!id) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        const query = {
                limit: args.limit,
                offset: args.offset,
                attributes: [
                    [
                        db.sequelize.fn(
                            'DISTINCT',
                            db.sequelize.col('seasonNumber')
                        ),
                        'seasonNumber'
                    ],
                    'masterId'
                ],
                where: {
                    masterId: id
                },
                order: [['seasonNumber']]
            },
            master = await db.content.findByPk(id);

        if (!master) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        if (master.type !== COMMON_CONSTANTS.CONTENT_TYPES.master) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.BAD_REQUEST,
                message: CONSTANTS.ERROR_MESSAGES.INVALID_PARAMETERS
            }));
        }

        // eslint-disable-next-line one-var
        const contents = await db.content.findAndCountAll(query);

        return urlUtils.formatListResponse(contents, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
