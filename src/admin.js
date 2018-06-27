const express = require('express');
const bodyParser = require('body-parser');
const AdminService = require('./service/admin');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 用户登录
app.post('/login', (req, res) => {
    AdminService.login(req, res, req.body)
});
// 退出登录
app.delete('/logout', (req, res) => {
    AdminService.logout(req, res)
});
// 获取登录用户的信息
app.get('/loginUser', (req, res) => {
    AdminService.getLoginUser(req, res)
});
// 获取用户信息
app.get('/:id', (req, res) => {
    AdminService.getUser(req, res, req.params.id)
});

module.exports = app;