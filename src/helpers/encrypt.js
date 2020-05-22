'use strict';

const crypto = require('crypto');

function encrypt(obj, salt) {
    let encrypted;

    if (obj) {
        let cipher = crypto.createCipher('aes-256-cbc', salt);

        encrypted = cipher.update(JSON.stringify(obj), 'utf8', 'hex');
        encrypted += cipher.final('hex');
    }

    return encrypted;
};

function decrypt(encrypted, salt) {
    try {
        let decipher = crypto.createDecipher('aes-256-cbc', salt),
            clear = decipher.update(encrypted, 'hex', 'utf8');

        clear += decipher.final('utf8');

        return JSON.parse(clear);
    } catch (err) {
        if (!(err instanceof SyntaxError)) {
            err = new SyntaxError();
        }

        throw err;
    }
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;

