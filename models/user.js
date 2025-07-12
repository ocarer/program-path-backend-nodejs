'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 필요하다면 나중에 다른 모델과의 관계(예: User가 여러 Project를 소유)를 여기에 정의합니다.
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false, // 사용자 이름은 필수
      unique: true      // 사용자 이름은 고유해야 함
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // 이메일은 필수
      unique: true,     // 이메일은 고유해야 함
      validate: {
        isEmail: true   // 유효한 이메일 형식인지 검증
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false  // 비밀번호는 필수
    }
  }, {
    sequelize,
    modelName: 'User',
    // 테이블 이름이 'users'가 아닌 다른 이름으로 생성될 경우,
    // tableName: 'users', 를 추가하여 명시적으로 지정할 수 있습니다.
  });
  return User;
};