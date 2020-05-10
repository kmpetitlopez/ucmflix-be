'use strict';

const db = require('ucmflix-db'),
    COMMON_CONSTANTS = require('ucmflix-db').constants,
    moment = require('moment'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants'),
    {Op} = require('sequelize');

exports.listContentEpisodes = async (id, args) => {
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
                where: {
                    masterId: id
                },
                order: [['seasonNumber'], ['episodeNumber']]
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

        if (args) {
            if (args.date || args.activeContents) {
                const date = (args.date && moment.utc(args.date).format()) || moment.utc().format(),
                    where = {
                        windowStartTime: {
                            [Op.lte]: moment.utc(date).format()
                        },
                        windowEndTime: {
                            [Op.or]: [
                                {
                                    [Op.is]: null
                                },
                                {
                                    [Op.gt]: moment.utc(date).format()
                                }
                            ]
                        }
                    };

                query.include = [{
                    model: db.vodEvent,
                    require: true,
                    where
                }];
            }

            if (args.seasonNumber) {
                query.where.seasonNumber = args.seasonNumber;
            }
        }
        // eslint-disable-next-line one-var
        const contents = await db.content.findAndCountAll(query);

        return urlUtils.formatListResponse(contents, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
