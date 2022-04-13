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
      dialect: 'postgres',
      use_env_variable: 'DATABASE_URL',
      define: {
        timestamps: false,
        underscored: true,
      },
    },
  };
