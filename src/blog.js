const express = require('express');
const bodyParser = require('body-parser');

const sqlext = require('./base/sqlext');
const SqlExt = new sqlext();

// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

/*获取博客列表*/
app.get('/list', (req, res) => {

    SqlExt.init();

});

module.exports = app;
