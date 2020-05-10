/* eslint-disable one-var */
'use strict';

const db = require('ucmflix-db'),
    moment = require('moment'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants'),
    {Op} = require('sequelize');

exports.listCategoryContents = async (id, args = {}) => {
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
                categoryId: id
            },
            include: [{model: db.content, require: true}]
        };

        if (args.date || args.activeContents) {
            const date = (args.date && moment.utc(args.date).format()) || moment.utc().format(),
                where = {};

            where.windowStartTime = {
                [Op.lte]: moment.utc(date).format()
            };

            where.windowEndTime = {
                [Op.or]: [
                    {
                        [Op.is]: null
                    },
                    {
                        [Op.gt]: moment.utc(date).format()
                    }
                ]
            };

            query.include[0].include = [{
                model: db.vodEvent,
                where,
                require: true
            }];
        }

        const category = await db.category.findByPk(parseInt(id));

        if (!category) {
            throw new Error(JSON.stringify({
                code: CONSTANTS.HTTP_ERROR_CODES.NOT_FOUND,
                message: CONSTANTS.ERROR_MESSAGES.ENTITY_NOT_FOUND
            }));
        }

        // eslint-disable-next-line one-var
        const categoryContents = await db.categoryReference.findAndCountAll(query);

        return urlUtils.formatListResponse(categoryContents, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
