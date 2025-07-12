// backend/config/db.js
require('dotenv').config(); // .env 파일의 환경 변수를 로드합니다.

const { Sequelize } = require('sequelize');

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(
  process.env.DB_NAME,     // 데이터베이스 이름
  process.env.DB_USER,     // 사용자 이름
  process.env.DB_PASSWORD, // 비밀번호
  {
    host: process.env.DB_HOST, // 호스트
    port: process.env.DB_PORT, // 포트
    dialect: 'postgres',       // 사용하는 데이터베이스 종류
    logging: false,            // 개발 시에는 true로 설정하여 SQL 쿼리를 콘솔에 출력할 수 있습니다.
  }
);

// 데이터베이스 연결을 시도하는 함수
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // 데이터베이스 연결을 테스트합니다.
    console.log('PostgreSQL connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:', error);
    // 연결 실패 시 애플리케이션을 종료합니다.
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };