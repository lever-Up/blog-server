const express = require('express');
const bodyParser = require('body-parser');
const ArticleService = require('./service/article');

// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

/*获取博客列表*/
app.get('/:id', (req, res) => {
    ArticleService.getArticle(res, req.param.id);
});

module.exports = app;
