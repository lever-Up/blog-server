const nodemailer = require('nodemailer');
const Factory = require('../base/factory');
const config = require('../base/config.json');
const Utils = require('../utils');

const tb_name = 'user';   // 表名

/**
 * 用户类接口
 */
const UserService = {
    // 发送邮件验证码
    sendMail: (req, res, email) => {
        let code = Utils.randomDigitCode(6);
        let mail = {
            from: 'blog <15913191260@163.com>', // 发件人
            subject: 'blog验证码', // 主题
            to: email, // 收件人
            text: `验证码：${code}, 5分钟内有效` // 邮件内容，HTML格式
        };
        // 创建一个SMTP客户端对象
        let transporter = nodemailer.createTransport(config.email);
        transporter.sendMail(mail, function(error, info){
            if(error) {
                res.send(Factory.responseError('发送失败'))
            }
            cache.set(email, code, 5*60);
            res.send(Factory.responseSuccess('已发送'))
        });
    },
    // 用户注册
    register: (req, res, params) => {
        let code = cache.get(params.email);
        if(code === params.code) {
            let user = params;
            delete user.code;
            Factory.add(tb_name, user).then( ({insertId}) => {
                if(insertId) {
                    Factory.get(tb_name, insertId).then( data => {
                        res.send(Factory.responseSuccess(data))
                    })
                }else{
                    res.send(Factory.responseError('添加失败'))
                }
            })
        } else {
            res.send(Factory.responseError('验证码不正确'))
        }
    },
    // 用户登录
    login: (req, res, params) => {
        let sql = `select * from ${tb_name} where name=? and password=?`;
        let values = [params.username, params.password];
        Factory.exec(sql, values).then( data => {
            if(data.length > 0) {
                let user = data[0];
                let token = Utils.guid();
                cache.set(token, user.id, cacheDeadline);
                res.cookie('token', token, {signed: true, maxAge:cacheDeadline*1000, httpOnly:false, path:'/'}); // 写入cookie
                res.send(Factory.responseSuccess({token}))
            }else{
                res.send(Factory.responseError('用户名或密码错误'))
            }
        })
    },
    // 推出登录
    logout: (req, res) => {
        let token = req.signedCookies.token;
        cache.del(token);
        res.send(Factory.responseSuccess({},'已退出登录'))
    },
    // 获取登录用户的信息
    getLoginUser: (req, res) => {
        let uid = Factory.getUid(req);
        if(uid) {
            Factory.get(tb_name, uid).then( user => {
                if(user) {
                    delete user.password;
                    res.send(Factory.responseSuccess(user))
                }else{
                    res.send(Factory.responseError('用户不存在'))
                }
            })
        }else{
            res.send(Factory.responseError('请重新登录'))
        }
    },
    // 用户列表
    queryUser: (req, res, params) => {
        Factory.query(tb_name, params).then( data => {
            res.send(Factory.responseSuccess(data))
        })
    },
    // 后台-添加用户
    addUser: (req, res, params) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            console.log(params)
            Factory.add(tb_name, params).then( ({insertId}) => {
                console.log(insertId)
                if(insertId) {
                    Factory.get(tb_name, insertId).then( data => {
                        res.send(Factory.responseSuccess(data))
                    })
                }else{
                    res.send(Factory.responseError('添加失败'))
                }
            })
        } else {
            res.send(Factory.responseError('请先登录'))
        }
    },
    // 修改用户信息
    modify: (req, res, id, params) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.update(tb_name, id, params).then( () => {
                Factory.get(tb_name, id).then( data => {
                    res.send(Factory.responseSuccess(data))
                })
            })
        } else {
            res.send(Factory.responseError('请先登录'))
        }
    },
    // 删除用户，单个/批量
    removeUser: (req, res, ids) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.remove(tb_name, ids).then( data => {
                res.send(Factory.responseSuccess(ids, '删除成功'))
            })
        } else {
            res.send(Factory.responseError('请先登录'))
        }
    }
};

module.exports = UserService;