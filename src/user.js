const express = require('express');
const bodyParser = require('body-parser');
const UserService = require('./service/user');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 获取登录用户的信息
app.get('/', (req, res) => {
    UserService.queryUser(req, res, req.body)
});
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
// 退出登录
app.delete('/logout', (req, res) => {
    UserService.logout(req, res)
});
// 获取登录用户的信息
app.get('/loginUser', (req, res) => {
    UserService.getLoginUser(req, res)
});
// 后台 - 添加用户
app.post('/add', (req, res) => {
    UserService.addUser(req, res, req.body)
});
// 修改用户信息
app.post('/:id', (req, res) => {
    UserService.modify(req, res, req.params.id, req.body)
});
// 删除 - 批量
app.delete('/batch', (req, res) => {
    UserService.removeUser(req, res, req.body.ids)
});
// 删除 - 单个
app.delete('/:id', (req, res) => {
    UserService.removeUser(req, res, req.params.id)
});

module.exports = app;