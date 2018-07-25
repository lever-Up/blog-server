/**
 * Category Controller
 */
const express = require('express');
const bodyParser = require('body-parser');
const CategoryService = require('./service/category');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * 查询类目列表
 * @api {GET} /category 查询类目列表
 * @apiDescription 根据条件获得相应的类目列表
 * @apiName queryList
 * @apiSampleRequest /category
 * @apiGroup category
 * @apiVersion 1.0.0
 */
app.get('/', (req, res) => {
    CategoryService.queryList(req, res);
});

/**
 * 获取类目信息
 * @api {GET} /category/:id 获取类目信息
 * @apiDescription 根据ID获得类目信息
 * @apiName getCategory
 * @apiSampleRequest /category/1
 * @apiGroup category
 * @apiVersion 1.0.0
 */
app.get('/:id', (req, res) => {
    CategoryService.getCategory(req, res, req.params.id);
});

/**
 * 添加类目
 * @api {POST} /category 添加类目
 * @apiDescription 添加类目
 * @apiName addCategory
 * @apiParam {String} name body，名称
 * @apiParam {String} [remark] body，备注
 * @apiSampleRequest /category
 * @apiGroup category
 * @apiVersion 1.0.0
 */
app.post('/', (req, res) => {
    CategoryService.addCategory(req, res, req.body)
});

/**
 * 修改类目
 * @api {POST} /category/:id 修改类目
 * @apiDescription 修改类目
 * @apiName modifyCategory
 * @apiParam {String} name body，名称
 * @apiParam {String} [remark] body，备注
 * @apiSampleRequest /category/1
 * @apiGroup category
 * @apiVersion 1.0.0
 */
app.post('/:id', (req, res) => {
    CategoryService.modifyCategory(req, res, req.params.id, req.body)
});

/**
 * 批量删除
 * @api {DELETE} /category/batch 批量删除
 * @apiDescription 批量删除类目
 * @apiName remove_batch
 * @apiParam {Array} ids body，类目ID集合
 * @apiSampleRequest /category/batch
 * @apiGroup category
 * @apiVersion 1.0.0
 */
app.delete('/batch', (req, res) => {
    CategoryService.removeCategory(req, res, req.body.ids)
});

/**
 * 删除单个类目
 * @api {DELETE} /category/:id 删除
 * @apiDescription 根据ID删除单个类目
 * @apiName remove
 * @apiSampleRequest /category/1
 * @apiGroup category
 * @apiVersion 1.0.0
 */
app.delete('/:id', (req, res) => {
    CategoryService.removeCategory(req, res, req.params.id)
});

module.exports = app;