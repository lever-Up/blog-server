const express = require('express');
const bodyParser = require('body-parser');
const UserService = require('./service/user');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * 获得用户列表
 * @api {GET} /user 获得用户列表
 * @apiDescription 根据条件筛选用户列表
 * @apiName queryUser
 * @apiSampleRequest /user
 * @apiGroup user
 * @apiVersion 1.0.0
 */
app.get('/', (req, res) => {
    UserService.queryUser(req, res, req.body)
});

/**
 * 获取邮箱验证码
 * @api {POST} /user/code 获取邮箱验证码
 * @apiDescription 注册时，获取邮箱验证码用于验证
 * @apiName sendMail
 * @apiParam {String} email body，邮箱地址
 * @apiSampleRequest /user/code
 * @apiGroup user
 * @apiVersion 1.0.0
 */
app.post('/code', (req, res) => {
    UserService.sendMail(req, res, req.body.email)
});

/**
 * 用户注册
 * @api {POST} /user/register 用户注册
 * @apiDescription 用户注册
 * @apiName register
 * @apiParam {String} name body，用户名，与邮箱地址一样
 * @apiParam {String} email body，邮箱地址
 * @apiParam {String} password body，密码
 * @apiParam {String} code body，邮箱验证码
 * @apiSampleRequest /user/register
 * @apiGroup user
 * @apiVersion 1.0.0
 */
app.post('/register', (req, res) => {
    UserService.register(req, res, req.body)
});

/**
 * 用户登录
 * @api {POST} /user/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiParam {String} username body，用户名
 * @apiParam {String} password body，密码
 * @apiSampleRequest /user/login
 * @apiGroup user
 * @apiVersion 1.0.0
 */
app.post('/login', (req, res) => {
    UserService.login(req, res, req.body)
});

/**
 * 退出登录
 * @api {DELETE} /user/logout 退出登录
 * @apiDescription 退出登录
 * @apiName logout
 * @apiHeader {String} token token会放置在cookie，测试的话在header里加token参数
 * @apiSampleRequest /user/logout
 * @apiGroup user
 * @apiVersion 1.0.0
 */
app.delete('/logout', (req, res) => {
    UserService.logout(req, res)
});

// 获取登录用户的信息
/**
 * 获取登录用户的信息
 * @api {DELETE} /user/loginUser 获取登录用户的信息
 * @apiDescription 获取登录用户的信息
 * @apiName getLoginUser
 * @apiHeader {String} token token会放置在cookie，测试的话在header里加token参数
 * @apiSampleRequest /user/loginUser
 * @apiGroup user
 * @apiVersion 1.0.0
 */
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