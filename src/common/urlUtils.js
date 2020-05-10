'use strict';

const constants = require('./constants'),
    _ = require('underscore'),
    moment = require('moment'),
    BASE_URL = process.env.BASE_URL;

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

function _buildPrevUrl(endpoint, args) {
    const limit = (args && args.limit),
        _args = _.clone(args || {});

    if (!args || !args.offset) {
        return null;
    }

    _args.offset = Math.max(_args.offset - limit, 0);

    return BASE_URL + endpoint + _toUrlParams(_args);
}

function _buildNextUrl(endpoint, args, result) {
    const offset = (args && args.offset),
        limit = (args && args.limit),
        _args = _.clone(args || {});

    if (offset + limit >= result.count) {
        return null;
    }

    _args.offset = offset + limit;

    return BASE_URL + endpoint + _toUrlParams(_args);
}

function _formatListResponse(result, endpoint, args) {
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

function _parseOrder(sort) {
    return sort && sort.includes('-') ? 'DESC' : 'ASC';
}

function _likePercents(args) {
    return `%${args}%`;
}

module.exports.toUrlParams = _toUrlParams;
module.exports.parseOrder = _parseOrder;
module.exports.formatListResponse = _formatListResponse;
module.exports.likePercents = _likePercents;
