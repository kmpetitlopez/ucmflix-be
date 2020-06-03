# ucmflix backend

## Getting started

- Install **NodeJS** (V10.16.0)  [Download here](https://nodejs.org/es/download/)

## Project setup
```
npm ci
```

- Configure .env file

```
NODE_ENV=development
CONFIG_FILE=path_to_config_file
BASE_URL=http://localhost
PORT=3000
COOKIE_NAME=ucmflix
COOKIE_SECRET=UCMFLIX-SECRET
COOKIE_MAX_AGE=14400000
AUTHENTICATION_CREDENTIALS_PASSPHRASE=credentials
FE_DOMAIN=http://localhost:8080
SMTP_SERVICE=gmail
SMTP_USER=ucmflix@gmail.com
SMTP_PASSWORD=cambiame
USER_PASSWORD_ENCRYPTATION_SALT=10
```
- Configure config.json file

```
{
    "development": {
      "username": "ucmflix",
      "password": "ucmflix",
      "database": "ucmflix",
      "host": "localhost",
      "port": "3306",
      "dialect": "mysql",
      "storage": "mysql",
      "logging": false,
      "retry": {
        "max": 3,
        "timeout": 62000,
        "match": [
          "DEADLOCK",
          "TIMEOUT"
        ]
      }
    }
}
```

## Run server
```
npm run start
```

## Test BE
- Import the postman collection stored in the _postman_ folder to validate everything is configured correctly.

## Dependencies

- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [body-parser](https://github.com/expressjs/body-parser)
- [cookie-session](https://github.com/expressjs/cookie-session)
- [cors](https://github.com/expressjs/cors)
- [dotenv](https://github.com/motdotla/dotenv)
- [express](https://github.com/expressjs/express)
- [i18n](https://github.com/mashpie/i18n-node)
- [moment](https://github.com/moment/moment)
- [passport](https://github.com/jaredhanson/passport)
- [passport-local](https://github.com/jaredhanson/passport-local)
- [underscore](https://github.com/jashkenas/underscore)
- [sequelize](https://github.com/sequelize/sequelize)
- ucmflix-db