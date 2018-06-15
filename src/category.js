/**
 * Category Controller
 */
const express = require('express');
const bodyParser = require('body-parser');
const CategoryService = require('./service/category');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 类目列表
app.get('/', (req, res) => {
    CategoryService.queryList(req, res);
});

// 获取类目信息
app.get('/:id', (req, res) => {
    CategoryService.getCategory(req, res, req.param.id);
});

// 添加类目
app.post('/', (req, res) => {
    console.log(req.body.data);
    CategoryService.addCategory(req, res, req.body.data)
});

// 修改类目
app.post('/:id', (req, res) => {
    CategoryService.modifyCategory(req, res, req.params.id, req.body.data)
});

// 删除 - 批量
app.delete('/batch', (req, res) => {
    CategoryService.removeCategory(req, res, req.body.data)
});

// 删除 - 单个
app.delete('/:id', (req, res) => {
    CategoryService.removeCategory(req, res, req.params.id)
});

module.exports = app;