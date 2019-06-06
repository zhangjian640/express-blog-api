var express = require('express');
var router = express.Router();
const {login, register} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')

/* GET users listing. */
router.post('/register', function(req, res, next) {
  const {username, password, realname} = req.body
  const result = register(username, password, realname)
  return result.then(loginData => {
    if (loginData.id) {
      // 设置session
      res.json(new SuccessModel(loginData))
      return
    }
    res.json(new ErrorModel('该用户名已注册'))

  })
});


router.post('/login', function(req, res, next) {
  const {username, password} = req.body
  const result = login(username, password)
  return result.then(loginData => {
    if (loginData.username) {
      // 设置session
      req.session.username = loginData.username
      req.session.realname = loginData.realname
      res.json(new SuccessModel(loginData))
      return
    }
    res.json(new ErrorModel('用户名或密码错误'))
  })
});

/*
router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    res.json({
      code: 0,
      msg: '登录成功'
    })
  }
  res.json({
    code: -1,
    msg: '未登录'
  })
})
*/

module.exports = router;
