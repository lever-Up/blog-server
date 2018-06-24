const qiniu = require('qiniu');
const fs = require('fs');
const path = require('path');
const Factory = require('../base/factory');
const config = require('../base/config.json');

const uploadDir = path.resolve(__dirname, '../../static/uploads');

const mac = new qiniu.auth.digest.Mac(config.qiniu.accessKey, config.qiniu.secretKey);
const options = {
    scope: config.qiniu.bucket,
}
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
const qiniuConfig = new qiniu.conf.Config();
const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
const putExtra = new qiniu.form_up.PutExtra();

/**
 * 文章类接口
 */
const FileService = {
    upload: (req, res) => {
        let files = req.files, urls = [];
        if(files.length > 0) {
            files.map(file => {
                formUploader.putFile(uploadToken, file.originalname, file.path, putExtra, function (respErr, respBody, respInfo) {
                    fs.unlink(`${uploadDir}\\${respInfo.data.key}`, () => {
                    });
                    if (respErr) {
                        res.send(Factory.responseError('上传失败'))
                    }
                    let url = `//pamnpeizp.bkt.clouddn.com/${respInfo.data.key}`;
                    urls.push(url);
                    if (urls.length === files.length) {
                        res.send(Factory.responseSuccess(urls))
                    }
                });
            });
        }else{
            res.send(Factory.responseError('没有文件'))
        }
    }
};

module.exports = FileService;