const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
// const upload = multer({ dest: path.resolve(__dirname, '../static/uploads') });
const FileService = require('./service/files');


var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../static/uploads'))
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
});

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 上传
app.post('/upload', upload.array('files'), (req, res) => {
    FileService.upload(req, res)
});

module.exports = app;