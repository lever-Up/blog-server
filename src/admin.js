const express = require('express');
const bodyParser = require('body-parser');
const AdminService = require('./service/admin');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 用户登录
/**
 * 管理员登录
 * @api {POST} /admin/login 管理员-登录
 * @apiDescription 管理员登录
 * @apiName login
 * @apiParam {String} username body，用户名
 * @apiParam {String} password body，密码
 * @apiSampleRequest /admin/login
 * @apiGroup admin
 * @apiVersion 1.0.0
 */
app.post('/login', (req, res) => {
    AdminService.login(req, res, req.body)
});

/**
 * 退出登录
 * @api {DELETE} /admin/logout 退出登录
 * @apiDescription 退出登录
 * @apiName logout
 * @apiSampleRequest /admin/logout
 * @apiGroup admin
 * @apiVersion 1.0.0
 */
app.delete('/logout', (req, res) => {
    AdminService.logout(req, res)
});

/**
 * 获取登录用户的信息
 * @api {GET} /admin/loginUser 获取登录用户的信息
 * @apiDescription 获取登录用户的信息
 * @apiName getLoginUser
 * @apiSampleRequest /admin/loginUser
 * @apiGroup admin
 * @apiVersion 1.0.0
 */
app.get('/loginUser', (req, res) => {
    AdminService.getLoginUser(req, res)
});
// 获取用户信息
app.get('/:id', (req, res) => {
    AdminService.getUser(req, res, req.params.id)
});

module.exports = app;