const express = require('express');
const cors = require('cors'); // CORS 패키지 임포트
const app = express();
const port = process.env.PORT || 3000;

// CORS 설정: 모든 도메인에서의 요청을 허용 (개발 단계에서 편리)
// 실제 운영 환경에서는 특정 도메인만 허용하도록 변경해야 합니다.
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from Program PATH Node.js Backend!');
});

app.listen(port, () => {
  console.log(`Node.js backend listening at http://localhost:${port}`);
});