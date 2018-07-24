/**
 * Article Controller
 */
const express = require('express');
const bodyParser = require('body-parser');
const ArticleService = require('./service/article');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * 获得博文列表
 * @api {GET} /article 获得博文列表
 * @apiDescription 根据条件获得相应的博文列表
 * @apiName queryList
 * @apiSampleRequest /article
 * @apiGroup article
 * @apiVersion 1.0.0
 */
app.get('/', (req, res) => {
    ArticleService.queryList(req, res, req.query);
});

/**
 * 获得博文信息
 * @api {GET} /article/:id 获得博文信息
 * @apiDescription 根据ID获得某个博文的信息
 * @apiName getArticle
 * @apiParam (path参数) {Number} id
 * @apiSampleRequest /article/12
 * @apiGroup article
 */
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