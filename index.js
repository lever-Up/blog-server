const express = require('express');
const mysql  = require('mysql');
const db = require('./src/base/db.json');

const blog = require('./src/blog');

const app = express();

//mysql数据库
global.mysqlPool = mysql.createPool({
    host     : db.host,
    user     : db.user,
    password : db.password,
    port: '3306',
    database: db.database,
    multipleStatements: true,
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, data");
    next();
});

app.use('/blog', blog);

app.get("/", function(req, res) {
    res.end('hello world');
});

app.listen(8098, () => {
    console.log('Magic happens on port 8098');
});

module.exports = app;
