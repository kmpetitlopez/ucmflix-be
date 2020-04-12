'use strict';

const db = require('ucmflix-db'),
    urlUtils = require('../common/urlUtils');

exports.listContentWithoutCategories = async (args = {}) => {
    try {
        const query = 'select contents.* from contents ' +
            'left outer join categoryReferences on contentId = contents.id ' +
            'where categoryId is null',
            contentCategories = await db.sequelize.query(query, {
                type: 'SELECT'
            });

        return urlUtils.formatListResponse(contentCategories, args.endpoint, args);
    } catch (err) {
        throw err;
    }
};
