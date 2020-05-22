'use strict';

const _ = require('underscore'),
    nodeMailer = require('nodemailer');

class Mail {
    constructor({smtpService, smtpUser, smtpPassword}) {
        if (!smtpService || !smtpUser || !smtpPassword) {
            throw new Error(`constructor:: invalid arguments! [smtpService=${smtpService}] | ` +
                `[smtpUser=${smtpUser}] | [smtpPassword=${smtpPassword}]`);
        }

        this.smtpService = smtpService;
        this.smtpUser = smtpUser;
        this.smtpPassword = smtpPassword;

        this.transporter = nodeMailer.createTransport({
            service: this.smtpService,
            auth: {
                user: this.smtpUser,
                pass: this.smtpPassword
            }
        });
    }

    static get EMAIL_REGEX() {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    }

    set subject(value) {
        if (value) {
            this._subject = value;
        }
    }

    set body(value) {
        if (value) {
            this._body = value;
        }
    }

    set destination(value) {
        if (value) {
            let emails = (typeof value === 'string') ? value.split(',') : value,
                validEmails = _.reduce(emails, (memo, e) => {
                    return memo && Mail.EMAIL_REGEX.test(e);
                }, emails.length > 0);

            if (validEmails) {
                this._destination = emails.join(',');
            }
        }
    }

    send() {
        return new Promise((resolve, reject) => {
            if (!this._subject || !this._body || !this._destination) {
                reject(new Error(`invalid email properties [subject=${this._subject}] | ` +
                    `[destination=${this._destination}] | [body=${this._body}]`));
            } else {
                this.transporter.sendMail(
                    {
                        from: this.smtpUser,
                        to: this._destination,
                        subject: this._subject,
                        html: this._body
                    },
                    (err, info) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(info);
                        }
                    });
            }
        });
    }
}

module.exports = Mail;