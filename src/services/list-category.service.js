'use strict';

const db = require('ucmflix-db'),
    moment = require('moment'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants'),
    {Op} = require('sequelize');

exports.listCategory = async (args) => {
    try {
        const query = {
            limit: args.limit || CONSTANTS.DEFAULT_LIMIT,
            offset: args.offset || CONSTANTS.DEFAULT_OFFSET,
            where: {}
        };

        if (args) {
            if (args.date || args.activeCategories) {
                const date = (args.date && moment.utc(args.date).format()) || moment.utc().format();

                query.where.startDate = {
                    [Op.lte]: moment.utc(date).format()
                };

                query.where.endDate = {
                    [Op.or]: [
                        {
                            [Op.is]: null
                        },
                        {
                            [Op.gt]: moment.utc(date).format()
                        }
                    ]
                };
            }
        }

        // eslint-disable-next-line one-var
        const categorys = await db.category.findAndCountAll(query);

        return urlUtils.formatListResponse(categorys, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
