// backend/routes/authRoutes.js
const express = require('express');
// authController에서 정의할 함수들을 미리 임포트합니다.
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// 회원가입 API 엔드포인트 (POST 요청으로 /api/auth/register)
router.post('/register', registerUser);

// 로그인 API 엔드포인트 (POST 요청으로 /api/auth/login)
router.post('/login', loginUser);

module.exports = router;