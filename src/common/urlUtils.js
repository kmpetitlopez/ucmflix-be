'use strict';

const constants = require('./constants'),
    _ = require('underscore'),
    moment = require('moment'),
    BASE_URL = process.env.BASE_URL;

// eslint-disable-next-line require-jsdoc
function _toUrlParams(args) {
    let str = '',
        isFirst = true;

    _.each(args, function(value, key) {
        if (value != null) {
            str += isFirst ? '?' : '&';
            str = value instanceof Date ? str + key + '=' + moment.utc(value).toISOString() : str + key + '=' + value;
            isFirst = false;
        }
    });

    return str;
}

// eslint-disable-next-line require-jsdoc
function _buildPrevUrl(endpoint, args) {
    const limit = (args && args.limit) || constants.DEFAULT_LIMIT,
        _args = _.clone(args || {});

    if (!args || !args.offset) {
        return null;
    }

    _args.offset = Math.max(_args.offset - limit, 0);

    return BASE_URL + endpoint + _toUrlParams(_args);
}

// eslint-disable-next-line require-jsdoc
function _buildNextUrl(endpoint, args, result) {
    const offset = (args && args.offset) || 0,
        limit = (args && args.limit) || constants.DEFAULT_LIMIT,
        _args = _.clone(args || {});

    if (offset + limit >= result.count) {
        return null;
    }

    _args.offset = offset + limit;

    return BASE_URL + endpoint + _toUrlParams(_args);
}

// eslint-disable-next-line require-jsdoc
function _formatListResponse(result, endpoint, args) {
    const response = {
        count: result.count,
        limit: (args && args.limit) || constants.DEFAULT_LIMIT,
        offset: (args && args.offset) || 0,
        prev: _buildPrevUrl(endpoint, _.omit(args, 'requester', 'jwtPayload')),
        next: _buildNextUrl(endpoint, _.omit(args, 'requester', 'jwtPayload'), result),
        items: result.rows || result
    };

    return response;
}

// eslint-disable-next-line require-jsdoc
function _parseOrder(sort) {
    return sort && sort.includes('-') ? 'DESC' : 'ASC';
}

// eslint-disable-next-line require-jsdoc
function _likePercents(args) {
    return `%${args}%`;
}

module.exports.toUrlParams = _toUrlParams;
module.exports.parseOrder = _parseOrder;
module.exports.formatListResponse = _formatListResponse;
module.exports.likePercents = _likePercents;
