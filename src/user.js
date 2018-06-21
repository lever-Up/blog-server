const express = require('express');
const bodyParser = require('body-parser');
const UserService = require('./service/user');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 获取邮箱验证码
app.post('/code', (req, res) => {
    UserService.sendMail(req, res, req.body.email)
});
// 添加用户/注册
app.post('/add', (req, res) => {
    res.send('user')
});
// 登录
app.post('/login', (req, res) => {
    res.send('user')
});

module.exports = app;