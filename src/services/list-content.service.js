'use strict';

const db = require('ucmflix-db'),
    moment = require('moment'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants'),
    {Op} = require('sequelize');

exports.listContent = async (args) => {
    try {
        const query = {
            limit: args.limit,
            offset: args.offset,
            where: {}
        };

        if (args) {
            if (args.title) {
                query.where.title = db.sequelize.where(
                    db.sequelize.fn(
                        'lower',
                        db.sequelize.col('title')
                    ),
                    {
                        [Op.like]: urlUtils.likePercents(
                            args.title.toLowerCase()
                        )
                    }
                );
            }

            if (args.newContent) {
                query.order = [['createdAt', 'desc']];
            }

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
        }
        // eslint-disable-next-line one-var
        const contents = await db.content.findAndCountAll(query);

        return urlUtils.formatListResponse(contents, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
