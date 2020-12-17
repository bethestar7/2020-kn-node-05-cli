'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename); //현재 파일 이름 저장하기
// https://p-iknow.netlify.app/node-js/path-moudle/ 참고하기

const env = process.env.NODE_ENV || 'development';
// NODE_ENV가 있으면 그게 들어가고 아니면 development를 env 변수에 넣음
const config = require('../config/config.js')(env);
// 위의 env 값에 따라 config.js에서 return해주는 객체가 => 이 config 변수에 들어간다
const db = {};


let sequelize = new Sequelize({ ...config }); //config 안에 들어온 객체를 펼쳐받기(db에 접속할 수 있는 정보) => sequelize 세팅 완료

/* 13번줄에서 세팅을 했기 때문에 아래 내용은 필요없음
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
*/


// model 생성 (sequelize 앞수업 할 때는 모델명, 필드정의, 옵션 인자로 만들었음)
fs //파일시스템 명령들임
  .readdirSync(__dirname) //models가 있는 현재 루트 폴더에서 (reddirSync는 파일을 읽어들이는 명령어)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'); //필터를 돌려서 js 파일들을 찾는다(file을 보내면 리턴해줘) //.이 들어가고?? file이 basename 즉 index.js인 거 말고? 끝세자리가 .js인 것 찾기?
  })
  .forEach(file => { //찾은 파일들(배열)을 forEach해줘 (각기 모델로 등록시키기)
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); //require로 js파일 불러오고(함수) 그 함수에 시퀄라이즈와 데이터타입을 보내서 model을 리턴받는다(함수 실행)(file을 보내면 리턴해줘)
    db[model.name] = model; //db의 모델 네임 = 리턴받은 model
    // 예를 들자면 db.User = model; 인 것인데 이 User가 변수인 model 로써 각각의 이름으로 들어오니 변수의 키값 넣는 방식인  [model.name] 으로 넣는다. 즉 model.name이 키가 되고 model이 값이 되어서 db에 들어가는 것
  });


// 관계 설정 취합
// 각 모델 파일에서 모델 관계에 대한 설정을 정의해야 한다.
// 설정한 각 모델 간의 관계를 아래 코드를 통해 통합한다!
// https://victorydntmd.tistory.com/32 참고!
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db); //associate()메서드 호출하면서 인자로 db 객체를 전달
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db; //require()하는 곳이 있다면 거기에 db 보내줌
// db에는 { User: User, Board: Board, sequelize, Sequelize(객체) } 이런 식으로 내용이 들어있을 것임



//우리는 모델만 만들면 된다