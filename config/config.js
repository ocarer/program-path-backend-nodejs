// backend/config/config.js
require('dotenv').config(); // .env 파일 로드

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME + "_test",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    // production 환경에서는 SSL 설정이 필요할 수 있습니다.
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false // Render와 같은 서비스에서는 필요할 수 있습니다.
    //   }
    // }
  },
};