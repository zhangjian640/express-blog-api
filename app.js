var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const path = require('path')
const fs = require('fs')
const RedisStore = require('connect-redis')(session)

var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');

var app = express();

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const fileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(fileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'xxxx',
  cookie: {
    // path: '/', // 默认配置
    // httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

// app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // handle the error
  res.status(err.status || 500);
  res.end('error');
});

module.exports = app;
