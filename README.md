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
BASE_URL=http://localhost:3000
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

## Dependencies

- [body-parser](https://github.com/expressjs/body-parser)
- [cors](https://github.com/expressjs/cors)
- [express](https://github.com/expressjs/express)
- [moment](https://github.com/moment/moment)
- [underscore](https://github.com/jashkenas/underscore)
- [sequelize](https://github.com/sequelize/sequelize)
- [dotenv](https://github.com/motdotla/dotenv)
- ucmflix-db