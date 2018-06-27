const express = require('express');
const cookieParser = require('cookie-parser');
const NodeCache = require('node-cache');
const sqlext = require('./src/base/sqlext');
const cache = new NodeCache();
const SqlExt = new sqlext();

const interface_article = require('./src/article');
const interface_category = require('./src/category');
const interface_user = require('./src/user');
const interface_files = require('./src/files');
const interface_admin = require('./src/admin');

// 解决response.send的JSON.stringify时对Date数据的处理
Date.prototype.toJSON = function () { return this.getTime() };

global.cache = cache;   // 缓存对象
global.cacheDeadline = 60*24*3; // 有效期3天，单位s

SqlExt.init();

const app = express();
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, data, uid");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
*/

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With, data, uid");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(cookieParser('session_secret'));
app.use(express.static('static'));

app.use('/blog/article', interface_article);
app.use('/blog/category', interface_category);
app.use('/blog/user', interface_user);
app.use('/blog/files', interface_files);
app.use('/blog/admin', interface_admin);

app.get("/", function(req, res) {
    res.end('hello world');
});

app.listen(8098, () => {
    console.log('to open: http://localhost:8098');
});

module.exports = app;
