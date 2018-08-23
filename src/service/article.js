const Factory = require('../base/factory');

const tb_name = 'article';   // 表名

// 获取类目数据与用户数据
const getOtherInfo = (article) => {
    return Promise.all([
        Factory.get('category', article.categoryId),
        Factory.get('user', article.uid)
    ])
};

/**
 * 文章类接口
 */
const ArticleService = {
    //文章列表
    queryList: async (req, res, params={}) => {
        let list = await Factory.query(tb_name, params);
        let totalCount = await Factory.count(tb_name, params);
        for(let item of list) {
            let od = await getOtherInfo(item);
            item.category = od[0];
            item.user = od[1];
        }
        // 页码信息
        let size = totalCount[0].count || 0;
        let { page=0, count=10 } = params;
        res.set({
            Range: JSON.stringify({page, count, size, pages: Math.ceil(size/count)})
        });
        // 返回
        res.send(Factory.responseSuccess(list));
    },
    //获取文章信息
    getArticle: (req, res, id) => {
        Factory.get(tb_name, id).then( data => {
            if(data) {
                getOtherInfo(data).then( od => {
                    data.category = od[0];
                    data.user = od[1];

                    res.send(Factory.responseSuccess(data))
                });
            }else{
                res.send(Factory.responseError('博文不存在,id='+id))
            }
        });
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
            res.send(Factory.responseError('请先登录'))
        }
    },
    // 修改文章
    modifyArticle: (req, res, id, params) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.update(tb_name, id, params).then( ret => {
                if(ret.affectedRows > 0) {
                    Factory.get(tb_name, id).then( data => {
                        res.send(Factory.responseSuccess(data))
                    })
                } else {
                    res.send(Factory.responseError('博文不存在，id='+id))
                }
            })
        } else {
            res.send(Factory.responseError('请先登录'))
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
            res.send(Factory.responseError('请先登录'))
        }
    }
};

module.exports = ArticleService;