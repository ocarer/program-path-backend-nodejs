// backend/controllers/authController.js
const { User } = require('../models'); // Sequelize User 모델 임포트 (models/index.js를 통해 접근)
const bcrypt = require('bcryptjs');     // 비밀번호 해싱 라이브러리
const jwt = require('jsonwebtoken');    // JWT (JSON Web Token) 라이브러리

// JWT 비밀 키: .env 파일에서 가져오거나, 없다면 임시 값을 사용합니다.
// **중요**: 실제 운영 환경에서는 절대로 코드에 직접 노출하지 말고, .env 파일에 강력한 비밀 키를 설정하세요!
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_that_is_very_long_and_random';

// 1. 회원가입 (Register) 컨트롤러 함수
exports.registerUser = async (req, res) => {
  // 클라이언트로부터 사용자 이름, 이메일, 비밀번호를 받습니다.
  const { username, email, password } = req.body;

  try {
    // 1-1. 이메일 중복 확인
    let user = await User.findOne({ where: { email } });
    if (user) {
      // 이미 해당 이메일로 가입된 사용자가 있다면 에러 반환
      return res.status(400).json({ message: '이미 해당 이메일로 가입된 사용자가 존재합니다.' });
    }

    // 1-2. 사용자 이름 중복 확인
    user = await User.findOne({ where: { username } });
    if (user) {
      // 이미 해당 사용자 이름이 있다면 에러 반환
      return res.status(400).json({ message: '해당 사용자 이름은 이미 사용 중입니다.' });
    }

    // 1-3. 비밀번호 해싱 (암호화)
    // bcrypt.genSalt(10)은 솔트(salt)를 생성하여 보안을 강화합니다.
    // bcrypt.hash()는 비밀번호와 솔트를 사용하여 해싱된 비밀번호를 만듭니다.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 1-4. 새 사용자 생성 및 데이터베이스에 저장
    user = await User.create({
      username,
      email,
      password: hashedPassword, // 해싱된 비밀번호 저장
    });

    // 1-5. JWT (JSON Web Token) 생성
    // jwt.sign(payload, secretKey, options)
    // payload: 토큰에 포함될 정보 (여기서는 사용자 ID)
    // secretKey: 토큰 서명에 사용되는 비밀 키 (절대 노출 금지!)
    // options: 토큰 유효 기간 (여기서는 1시간)
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // 1-6. 성공 응답 전송
    res.status(201).json({
      message: '회원가입이 성공적으로 완료되었습니다!',
      token, // 클라이언트에 토큰 발급
      user: { // 사용자 정보도 함께 전달
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    // 에러 발생 시 콘솔에 기록하고 500 에러 응답
    console.error('회원가입 중 서버 오류 발생:', error);
    res.status(500).json({ message: '회원가입 중 서버 오류가 발생했습니다.' });
  }
};

// 2. 로그인 (Login) 컨트롤러 함수
exports.loginUser = async (req, res) => {
  // 클라이언트로부터 이메일과 비밀번호를 받습니다.
  const { email, password } = req.body;

  try {
    // 2-1. 이메일로 사용자 찾기
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // 해당 이메일의 사용자가 없다면 에러 반환
      return res.status(400).json({ message: '유효하지 않은 이메일 또는 비밀번호입니다.' });
    }

    // 2-2. 비밀번호 일치 여부 확인
    // bcrypt.compare()를 사용하여 입력된 비밀번호와 해싱된 비밀번호를 비교합니다.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // 비밀번호가 일치하지 않으면 에러 반환
      return res.status(400).json({ message: '유효하지 않은 이메일 또는 비밀번호입니다.' });
    }

    // 2-3. 로그인 성공 시 JWT 생성
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // 2-4. 성공 응답 전송
    res.status(200).json({
      message: '로그인이 성공적으로 완료되었습니다!',
      token, // 클라이언트에 토큰 발급
      user: { // 사용자 정보도 함께 전달
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    // 에러 발생 시 콘솔에 기록하고 500 에러 응답
    console.error('로그인 중 서버 오류 발생:', error);
    res.status(500).json({ message: '로그인 중 서버 오류가 발생했습니다.' });
  }
};