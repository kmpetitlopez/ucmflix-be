'use strict';

const CONSTANTS = require('./constants'),
    _ = require('underscore'),
    moment = require('moment'),
    url = require('url'),
    BASE_URL = process.env.BASE_URL + ':' + process.env.PORT;

function toUrlParams(args) {
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

function _buildPrevUrl(endpoint, args) {
    const limit = (args && args.limit),
        _args = _.clone(args || {});

    if (!args || !args.offset) {
        return null;
    }

    _args.offset = Math.max(_args.offset - limit, 0);

    return BASE_URL + endpoint + toUrlParams(_args);
}

function _buildNextUrl(endpoint, args, result) {
    const offset = (args && args.offset),
        limit = (args && args.limit),
        _args = _.clone(args || {});

    if (offset + limit >= result.count) {
        return null;
    }

    _args.offset = offset + limit;

    return BASE_URL + endpoint + toUrlParams(_args);
}

function formatListResponse(result, endpoint, args) {
    const response = {
        count: result.count,
        limit: (args && args.limit),
        offset: (args && args.offset),
        prev: _buildPrevUrl(endpoint, _.omit(args, 'requester', 'jwtPayload', 'endpoint')),
        next: _buildNextUrl(endpoint, _.omit(args, 'requester', 'jwtPayload', 'endpoint'), result),
        items: result.rows || result
    };

    return response;
}

function parseOrder(sort) {
    return sort && sort.includes('-') ? 'DESC' : 'ASC';
}

function likePercents(args) {
    return `%${args}%`;
}

function isAuthUrl(fullUrl) {
    const URL = url.parse(fullUrl),
        pathname = URL && URL.pathname;
    
    return CONSTANTS.AUTH_REGEX.test(pathname);
}

module.exports.toUrlParams = toUrlParams;
module.exports.parseOrder = parseOrder;
module.exports.formatListResponse = formatListResponse;
module.exports.likePercents = likePercents;
module.exports.isAuthUrl = isAuthUrl;
