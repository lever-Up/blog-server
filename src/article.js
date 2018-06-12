const express = require('express');
const bodyParser = require('body-parser');
const ArticleService = require('./service/article');

// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

// 博客列表
app.get('/', (req, res) => {
    ArticleService.queryList(req, res);
});

// 获取博客信息
app.get('/:id', (req, res) => {
    ArticleService.getArticle(req, res, req.param.id);
});

module.exports = app;