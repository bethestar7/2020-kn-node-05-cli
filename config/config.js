module.exports = (env) => { //env 받아와서 / module.exports 명령어는 모듈에서 내보내주는 값을 리턴한다. require()를 호출했을 때 받게 되는 값이다.
  if(env == 'production') {
    return {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT
    }
  }
  else {
    return {
      username: process.env.DB_PRD_USER,
      password: process.env.DB_PRD_PASS,
      database: process.env.DB_PRD_NAME,
      host: process.env.DB_PRD_HOST,
      dialect: process.env.DB_PRD_DIALECT
    }
  }
}