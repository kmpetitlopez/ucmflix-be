'use strict';

const db = require('ucmflix-db'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt');

async function verifyUser(username, password, done) {
    try {
        const user = await db.user.findOne({where: {username}});
        
        if (user) {
            const isCorrectPassword = await bcrypt.compare(password, user.password),
                formattedUser = user.get({plain: true});
            delete formattedUser.password;
            return done(null, isCorrectPassword ? formattedUser : false);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}

async function getUser(id) {
    const user = await db.user.findByPk(id, {
            include: [db.role]
        }),
        formattedUser = user && user.get({plain: true});

    delete formattedUser.password;

    return formattedUser;
}

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, verifyUser));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await getUser(id);
    done(null, user);
});

module.exports.initialize = () => {
    return passport.initialize();
};
module.exports.session = () => {
    return passport.session();
};
module.exports.verifyUser = verifyUser;
module.exports.getUser = getUser;