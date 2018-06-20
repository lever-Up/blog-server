/**
 * Article Controller
 */
const express = require('express');
const bodyParser = require('body-parser');
const ArticleService = require('./service/article');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 博文列表
app.get('/', (req, res) => {
    ArticleService.queryList(req, res);
});

// 获取博文信息
app.get('/:id', (req, res) => {
    ArticleService.getArticle(req, res, req.params.id);
});

// 添加博文
app.post('/', (req, res) => {
    ArticleService.addArticle(req, res, req.body)
});

// 修改博文
app.post('/:id', (req, res) => {
    ArticleService.modifyArticle(req, res, req.params.id, req.body)
});

// 删除 - 批量
app.delete('/batch', (req, res) => {
    ArticleService.removeArticle(req, res, req.body.ids)
});

// 删除 - 单个
app.delete('/:id', (req, res) => {
    ArticleService.removeArticle(req, res, req.params.id)
});

module.exports = app;