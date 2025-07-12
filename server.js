// backend/server.js
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // connectDB 함수 임포트

const app = express();
const port = process.env.PORT || 3000;

// CORS 설정
app.use(cors());
app.use(express.json()); // JSON 요청 본문 파싱을 위한 미들웨어

// 데이터베이스 연결 시도 (서버 시작 전에)
connectDB();

app.get('/', (req, res) => {
  res.send('Hello from Program PATH Node.js Backend!');
});

app.listen(port, () => {
  console.log(`Node.js backend listening at http://localhost:${port}`);
});