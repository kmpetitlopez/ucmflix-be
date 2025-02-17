'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils'),
    {Op} = require('sequelize');

exports.listImage = async (args = {}) => {
    try {
        const query = {
            limit: args.limit,
            offset: args.offset,
            where: {}
        };

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

        const images = await db.image.findAndCountAll(query);

        return urlUtils.formatListResponse(images, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
