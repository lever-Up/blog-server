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
        let mail = {
            // 发件人
            from: 'blog <15913191260@163.com>',
            // 主题
            subject: 'blog验证码',
            // 收件人
            to: email,
            // 邮件内容，HTML格式
            text: `验证码：${Utils.randomDigitCode(6)}`
        };
        // 创建一个SMTP客户端对象
        let transporter = nodemailer.createTransport(config.email);
        transporter.sendMail(mail, function(error, info){
            if(error) {
                res.send(Factory.responseError('发送失败'))
            }
            res.send(Factory.responseSuccess(info.response))
        });
    }
};

module.exports = UserService;