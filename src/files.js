const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const FileService = require('./service/files');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 上传
app.post('/upload', upload.array('files'), (req, res) => {
    FileService.upload(req, res)
});

module.exports = app;