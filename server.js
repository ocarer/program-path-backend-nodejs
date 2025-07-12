const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Render는 PORT 환경 변수를 사용합니다.

app.get('/', (req, res) => {
  res.send('Hello from Program PATH Node.js Backend!');
});

app.listen(port, () => {
  console.log(`Node.js backend listening at http://localhost:${port}`);
});