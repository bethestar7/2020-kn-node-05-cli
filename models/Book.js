module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Book', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    writer: {
      type: DataTypes.STRING(20)
    },
    comment: {
      type: DataTypes.TEXT()
    }
  }, {
    charset: 'utf8',
    tableName: 'seq-book'
  });
}

//모델 하나 정의 끝
//테이블 당 모델 하나씩 만들어지는 것
//models폴더의 index.js가 본인을 제외한 models 폴더의 js파일들을 읽어들여서 각기모델을 생성한다