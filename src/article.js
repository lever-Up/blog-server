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
 * @apiParam {Array} [query] 查询条件
 * @apiParam {String} [sort=-createTime] 排序方式
 * @apiParam {Number} [page=0] 当前页码
 * @apiParam {Number} [count=10] 每次查询多少条数据
 * @apiParamExample {json} Request-Example:
 *      {
 *         query: [
 *            { key: 'title', value: '测试' },
 *            { key: 'createTime', value: '2018-08-01', value2: '2018-08-15' },
 *            [
 *                { key: 'tagId', value: 1 },
 *                { key: 'tagId', value: 2 }
 *            ]
 *         ],
 *         sort: '-createTime',
 *         page: 0,
 *         count: 10
 *      }
 * @apiSampleRequest /article
 * @apiGroup article
 * @apiVersion 1.0.0
 */
app.get('/', (req, res) => {
    console.log(req.query)
    ArticleService.queryList(req, res, req.query);
});

/**
 * 获得博文信息
 * @api {GET} /article/:id 获得博文信息
 * @apiDescription 根据ID获得某个博文的信息
 * @apiName getArticle
 * @apiSampleRequest /article/1
 * @apiGroup article
 * @apiVersion 1.0.0
 */
app.get('/:id', (req, res) => {
    ArticleService.getArticle(req, res, req.params.id);
});

/**
 * 添加博文
 * @api {POST} /article 添加博文
 * @apiDescription 添加博文信息
 * @apiName addArticle
 * @apiParam {String} title body，标题
 * @apiParam {String} content body，内容
 * @apiParam {String} categoryId body，类目ID
 * @apiSampleRequest /article
 * @apiGroup article
 * @apiVersion 1.0.0
 */
app.post('/', (req, res) => {
    ArticleService.addArticle(req, res, req.body)
});

/**
 * 修改博文
 * @api {POST} /article/:id 修改博文
 * @apiDescription 根据ID修改博文信息
 * @apiName modifyArticle
 * @apiParam {String} title body，标题
 * @apiParam {String} content body，内容
 * @apiParam {String} categoryId body，类目ID
 * @apiSampleRequest /article/1
 * @apiGroup article
 * @apiVersion 1.0.0
 */
app.post('/:id', (req, res) => {
    ArticleService.modifyArticle(req, res, req.params.id, req.body)
});

/**
 * 批量删除博文
 * @api {DELETE} /article/batch 批量删除
 * @apiDescription 根据多个id批量删除博文
 * @apiName remove_batch
 * @apiParam {Array} ids body，博文ID集合
 * @apiSampleRequest /article/batch
 * @apiGroup article
 * @apiVersion 1.0.0
 */
app.delete('/batch', (req, res) => {
    ArticleService.removeArticle(req, res, req.body.ids)
});

/**
 * 删除一条博文
 * @api {DELETE} /article/:id 删除
 * @apiDescription 根据id删除一条博文
 * @apiName remove
 * @apiSampleRequest /article/1
 * @apiGroup article
 * @apiVersion 1.0.0
 */
app.delete('/:id', (req, res) => {
    ArticleService.removeArticle(req, res, req.params.id)
});

module.exports = app;