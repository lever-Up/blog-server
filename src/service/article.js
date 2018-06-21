const Factory = require('../base/factory');

const tb_name = 'article';   // 表名

/**
 * 文章类接口
 */
const ArticleService = {
    //文章列表
    queryList: (req, res) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.query(tb_name, {uid}).then( data => {
                res.send(Factory.responseSuccess(data))
            })
        }else{
            res.send(Factory.responseError('uid为空'))
        }
    },
    //获取文章信息
    getArticle: (req, res, id) => {
        if(id) {
            Factory.get(tb_name, id).then( data => {
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
            Factory.add(tb_name, params).then( ({insertId}) => {
                if(insertId) {
                    Factory.get(tb_name, insertId).then( data => {
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
            Factory.update(tb_name, id, params).then( () => {
                Factory.get(tb_name, id).then( data => {
                    res.send(Factory.responseSuccess(data))
                })
            })
        } else {
            res.send(Factory.responseError('uid为空'))
        }
    },
    // 批量删除文章
    removeArticle: (req, res, ids) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.remove(tb_name, ids).then( data => {
                res.send(Factory.responseSuccess(ids, '删除成功'))
            })
        } else {
            res.send(Factory.responseError('uid为空'))
        }
    }
};

module.exports = ArticleService;