const nodemailer = require('nodemailer');
const Factory = require('../base/factory');
const config = require('../base/config.json');
const Utils = require('../utils')

const tb_name = 'user';   // 表名

/**
 * 用户类接口
 */
const UserService = {
    sendMail: (req, res, email) => {
        let code = Utils.randomDigitCode(6);
        let mail = {
            from: 'blog <15913191260@163.com>', // 发件人
            subject: 'blog验证码', // 主题
            to: email, // 收件人
            text: `验证码：${code}` // 邮件内容，HTML格式
        };
        // 创建一个SMTP客户端对象
        let transporter = nodemailer.createTransport(config.email);
        transporter.sendMail(mail, function(error, info){
            if(error) {
                res.send(Factory.responseError('发送失败'))
            }
            res.send(Factory.responseSuccess(info.response))
        });
    },
    // 添加用户、注册
    addUser: (req, res, params) => {
        Factory.add(tb_name, params).then( ({insertId}) => {
            if(insertId) {
                Factory.get(tb_name, insertId).then( data => {
                    res.send(Factory.responseSuccess(data))
                })
            }else{
                res.send(Factory.responseError('添加失败'))
            }
        })
    },
    // 登录
    login: (req, res, params) => {

    },
    // 推出登录
    logout: (req, res) => {

    }
};

module.exports = UserService;