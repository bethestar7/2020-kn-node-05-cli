require('dotenv').config(); //dotenv 불러와서 config()하기

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { sequelize } = require('./models'); //models폴더의 index.js에서 가져오기

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

sequelize.sync(); //모델 생성


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //env가 developement라면 에러 보여주고 아니면 보여주지 않겠다

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
