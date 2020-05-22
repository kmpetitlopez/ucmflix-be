'use strict';

module.exports = {
    DEFAULT_LIMIT: 50,

    DEFAULT_OFFSET: 0,

    HTTP_SUCCESS_CODES: {
        OK: 200,
        RESOURCE_CREATED: 201,
        RESOURCE_DELETED: 204,
        NO_CONTENT: 204
    },

    HTTP_ERROR_CODES: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        CONFLICT: 409,
        INTERNAL_SERVER_ERROR: 500,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504
    },

    ERROR_MESSAGES: {
        UNKNOWN_SUBERROR_MESSAGE: 'UNKNOWN_SUBERROR_MESSAGE',
        ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND',
        VALIDATION_ERROR: 'VALIDATION_ERROR',
        INVALID_PARAMETERS: 'INVALID_PARAMETERS',
        CANNOT_LOG_IN: 'CANNOT_LOG_IN',
        INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
        UNAUTHORIZED: 'UNAUTHORIZED',
        FORBIDDEN: 'FORBIDDEN',
        USER_ALREADY_EXIST: 'USER_ALREADY_EXIST',
        EXPIRED_TOKEN: 'EXPIRED_TOKEN'
    },

    SUCCESS_MESSAGES: {
        LOGGED_IN: 'LOGGED_IN',
        LOGGED_OUT: 'LOGGED_OUT'
    },

    DIRECTION: {
        next: 'next',
        prev: 'prev'
    },

    AUTH_REGEX: /\/auth\//,

    PERMISSIONS: {
        ADMIN: 'ADMIN',
        USER: 'USER'
    },

    ALLOWED_METHODS: {
        ADMIN: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        USER: ['GET']
    }
};
