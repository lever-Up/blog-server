/**
 * Article Controller
 */
const express = require('express');
const bodyParser = require('body-parser');
const ArticleService = require('./service/article');

// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

// 博文列表
app.get('/', (req, res) => {
    ArticleService.queryList(req, res);
});

// 获取博文信息
app.get('/:id', (req, res) => {
    ArticleService.getArticle(req, res, req.param.id);
});

// 添加博文
app.post('/', urlencodedParser, (req, res) => {
    console.log(req.body.data);
    ArticleService.addArticle(req, res, req.body.data)
});

// 修改博文
app.post('/:id', urlencodedParser, (req, res) => {
    ArticleService.modifyArticle(req, res, req.params.id, req.body.data)
});

// 删除 - 批量
app.del('/batch', urlencodedParser, (req, res) => {
    ArticleService.removeArticle(req, res, req.body.data)
});

// 删除 - 单个
app.del('/:id', (req, res) => {
    ArticleService.removeArticle(req, res, req.params.id)
});

module.exports = app;