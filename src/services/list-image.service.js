'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    CONSTANTS = require('../common/constants'),
    {Op} = require('sequelize');

exports.listImage = async (args) => {
    try {
        const query = {
            limit: args.limit || CONSTANTS.DEFAULT_LIMIT,
            offset: args.offset || CONSTANTS.DEFAULT_OFFSET,
            where: {}
        };

        if (args) {
            if (args.name) {
                query.where.name = db.sequelize.where(
                    db.sequelize.fn(
                        'lower',
                        db.sequelize.col('name')
                    ),
                    {
                        [Op.like]: urlUtils.likePercents(
                            args.name.toLowerCase()
                        )
                    }
                );
            }
        }

        // eslint-disable-next-line one-var
        const images = await db.image.findAndCountAll(query);

        return urlUtils.formatListResponse(images, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
