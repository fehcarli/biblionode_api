require('dotenv').config();
module.exports = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false,
    },
    test: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false,
    },
    production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      url: process.env.DB_URL,
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  };
