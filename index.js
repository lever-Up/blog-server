const express = require('express');
const sqlext = require('./src/base/sqlext');
const SqlExt = new sqlext();

const interface_article = require('./src/article');
const interface_category = require('./src/category');
const interface_user = require('./src/user');

SqlExt.init();

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, data, uid");
    next();
});

app.use(express.static('static'));

app.use('/blog/article', interface_article);
app.use('/blog/category', interface_category);
app.use('/blog/user', interface_user);

app.get("/", function(req, res) {
    res.end('hello world');
});

app.listen(8098, () => {
    console.log('to open: http://localhost:8098');
});

module.exports = app;
