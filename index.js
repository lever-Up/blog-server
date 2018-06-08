const express = require('express');
const sqlext = require('./src/base/sqlext');
const SqlExt = new sqlext();
const blog = require('./src/blog');

SqlExt.init();

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, data, uid");
    next();
});

app.use(express.static('static'));

app.use('/blog', blog);

app.get("/", function(req, res) {
    res.end('hello world');
});

app.listen(8098, () => {
    console.log('Magic happens on port 8098');
});

module.exports = app;
