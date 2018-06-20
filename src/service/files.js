const qiniu = require('qiniu');
const fs = require('fs');
const path = require('path');
const Factory = require('../base/factory');

const uploadDir = path.resolve(__dirname, '../../static/uploads');

const accessKey = 'UfBd-GLQDvBP7EGJtPqKcbbs82noj9_RT3bqi4IA';
const secretKey = 'tvnLr4XPCKxx6MlI2Xuptecgt2yDeCVRLTrSS7hT';
const bucket = 'blog';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
    scope: bucket,
}
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
const config = new qiniu.conf.Config();
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

/**
 * 文章类接口
 */
const FileService = {
    upload: (req, res) => {
        let files = req.files, urls = [];
        files.map( file => {
            formUploader.putFile(uploadToken, file.originalname, file.path, putExtra, function(respErr, respBody, respInfo) {
                fs.unlink(`${uploadDir}\\${respInfo.data.key}`, ()=>{});
                if (respErr) {
                    res.send(Factory.responseError('上传失败'))
                }
                let url = `//pamnpeizp.bkt.clouddn.com/${respInfo.data.key}`;
                urls.push(url);
                if(urls.length === files.length) {
                    res.send(Factory.responseSuccess(urls))
                }
            });
        });
    }
};

module.exports = FileService;