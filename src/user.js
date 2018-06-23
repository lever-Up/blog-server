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
// 用户注册
app.post('/register', (req, res) => {
    UserService.register(req, res, req.body)
});
// 用户登录
app.post('/login', (req, res) => {
    UserService.login(req, res, req.body)
});
// 后台登录
app.post('/admin/login', (req, res) => {
    UserService.adminLogin(req, res, req.body)
});
// 退出登录
app.delete('/logout', (req, res) => {
    UserService.logout(req, res)
});
// 获取登录用户的信息
app.get('/loginUser', (req, res) => {
    UserService.getLoginUser(req, res)
});

module.exports = app;