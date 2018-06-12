const express = require('express');
const bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.get('/', (req, res) => {
    res.send('category')
});

module.exports = app;