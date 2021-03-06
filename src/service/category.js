const Factory = require('../base/factory');

const tb_name = 'category';   // 表名

/**
 * 文章类接口
 */
const CategoryService = {
    // 类目列表
    queryList: (req, res) => {
        Factory.query(tb_name, {}).then( data => {
            res.send(Factory.responseSuccess(data))
        })
    },
    //获取类目信息
    getCategory: (req, res, id) => {
        if(id) {
            Factory.get(tb_name, id).then( data => {
                if(data) {
                    res.send(Factory.responseSuccess(data))
                } else {
                    res.send(Factory.responseError('类目不存在，id='+id))
                }
            });
        }else{
            res.send(Factory.responseError('类目id为空'))
        }
    },
    //添加类目
    addCategory: (req, res, params) => {
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
    // 修改类目
    modifyCategory: (req, res, id, params) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.update(tb_name, id, params).then( data => {
                if(data.affectedRows > 0) {
                    Factory.get(tb_name, id).then( data2 => {
                        res.send(Factory.responseSuccess(data2))
                    });
                } else {
                    res.send(Factory.responseError('类目不存在，id='+id))
                }
            })
        } else {
            res.send(Factory.responseError('请先登录'))
        }
    },
    // 批量删除类目
    removeCategory: (req, res, ids) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.remove(tb_name, ids).then( data => {
                if(data) {
                    res.send(Factory.responseSuccess(ids, '删除成功'))
                } else {
                    res.send(Factory.responseError('删除失败'))
                }
            })
        } else {
            res.send(Factory.responseError('请先登录'))
        }
    }
};

module.exports = CategoryService;