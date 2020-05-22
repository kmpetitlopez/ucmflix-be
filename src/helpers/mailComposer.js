'use strict';

const Mail = require('./mail'),
    i18n = require('./i18n'),
    args = {
        smtpService: process.env.SMTP_SERVICE,
        smtpUser: process.env.SMTP_USER,
        smtpPassword: process.env.SMTP_PASSWORD
    };

function _createMail() {
    const mail = new Mail(args);

    return mail;
}

exports.welcomeEmail = async(username, link) => {
    const mail = _createMail();

    mail.subject = i18n.__('EMAIL.WELCOME_EMAIL_SUBJECT');
    mail.body = i18n.__('EMAIL.WELCOME_EMAIL_BODY', {name: username, link: link});

    return mail;
};

exports.resetPasswordEmail = async(username, link) => {
    const mail = _createMail();

    mail.subject = i18n.__('EMAIL.RESET_PASSWORD_EMAIL_SUBJECT');
    mail.body = i18n.__('EMAIL.RESET_PASSWORD_EMAIL_BODY', {name: username, link: link});

    return mail;
};
