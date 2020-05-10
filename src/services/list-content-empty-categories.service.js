'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils');

exports.listContentWithoutCategories = async (args = {}) => {
    try {
        const query = 'select contents.* from contents ' +
            'left outer join categoryReferences on contentId = contents.id ' +
            'where categoryId is null limit :limit offset :offset',
            contentCategories = await db.sequelize.query(query, {
                type: 'SELECT',
                replacements: {
                    limit: args.limit,
                    offset: args.offset
                }
            });

        return urlUtils.formatListResponse(contentCategories, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
