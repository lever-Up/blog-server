/**
 * Category Controller
 */
const express = require('express');
const bodyParser = require('body-parser');
const CategoryService = require('./service/category');

// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

// 类目列表
app.get('/', (req, res) => {
    CategoryService.queryList(req, res);
});

// 获取类目信息
app.get('/:id', (req, res) => {
    CategoryService.getCategory(req, res, req.param.id);
});

// 添加类目
app.post('/', urlencodedParser, (req, res) => {
    console.log(req.body.data);
    CategoryService.addCategory(req, res, req.body.data)
});

// 修改类目
app.post('/:id', urlencodedParser, (req, res) => {
    CategoryService.modifyCategory(req, res, req.params.id, req.body.data)
});

// 删除 - 批量
app.del('/batch', urlencodedParser, (req, res) => {
    CategoryService.removeCategory(req, res, req.body.data)
});

// 删除 - 单个
app.del('/:id', (req, res) => {
    CategoryService.removeCategory(req, res, req.params.id)
});

module.exports = app;