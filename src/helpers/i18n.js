'use strict';

const i18n = require('i18n');

i18n.configure({
    directory: 'src/data/locales',
    defaultLocale: 'es',
    objectNotation: true,
    updateFiles: false
});

module.exports = i18n;