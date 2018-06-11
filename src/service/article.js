const Factory = require('../base/factory');

const tb_article = 'article';   // 表名

const ArticleService = {
    //文章列表
    queryList: (req, res) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.query(tb_article, {uid}).then( data => {
                res.send(Factory.responseSuccess(data))
            })
        }else{
            res.send(Factory.responseError('uid为空'))
        }
    },
    //获取文章信息
    getArticle: (req, res, id) => {
        if(id) {
            Factory.get(tb_article, id).then( data => {
                res.send(Factory.responseSuccess(data))
            });
        }else{
            res.send(Factory.responseError('id为空'))
        }
    },
    //添加文章
    addArticle: (req, res, params) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            params.uid = uid;
            Factory.add(tb_article, params).then( ({insertId}) => {
                if(insertId) {
                    Factory.get('article', insertId).then( data => {
                        res.send(Factory.responseSuccess(data))
                    })
                }else{
                    res.send(Factory.responseError('添加失败'))
                }
            })
        } else {
            res.send(Factory.responseError('uid为空'))
        }
    },
    // 修改文章
    modifyArticle: (req, res, id, params) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.update(tb_article, id, params).then( data => {
                res.send(Factory.responseSuccess(data))
            })
        } else {
            res.send(Factory.responseError('uid为空'))
        }
    },
    // 批量删除文章
    removeArticle: (req, res, ids) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.remove(tb_article, ids).then( data => {
                res.send(Factory.responseSuccess('', '删除成功'))
            })
        } else {
            res.send(Factory.responseError('uid为空'))
        }
    }
};

module.exports = ArticleService;