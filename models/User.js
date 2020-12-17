module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    userid: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    userpw: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(20)
    }
  }, {
    charset: 'utf8',
    tableName: 'seq-user'
  });
}

//모델 하나 정의 끝
//테이블 당 모델 하나씩 만들어지는 것