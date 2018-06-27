const nodemailer = require('nodemailer');
const Factory = require('../base/factory');
const config = require('../base/config.json');
const Utils = require('../utils');

const tb_name = 'admin';   // 表名

/**
 * 用户类接口
 */
const AdminService = {
    // 管理员登录
    login: (req, res, params) => {
        let sql = `select * from ${tb_name} where name=? and password=?`;
        let values = [params.username, params.password];
        Factory.exec(sql, values).then( data => {
            if(data.length > 0) {
                let user = data[0];
                let token = Utils.guid();
                cache.set(token, user.id, cacheDeadline);
                res.cookie('token', token, {signed: true, maxAge:cacheDeadline*1000, httpOnly:true, path:'/'}); // 写入cookie
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
        console.log('uid:',uid)
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
    getUser: (req, res, uid) => {
        Factory.get(tb_name, uid).then( user => {
            if(user) {
                delete user.password;
                res.send(Factory.responseSuccess(user))
            }else{
                res.send(Factory.responseError('用户不存在'))
            }
        })
    }
};

module.exports = AdminService;