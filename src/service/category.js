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
                res.send(Factory.responseSuccess(data))
            });
        }else{
            res.send(Factory.responseError('id为空'))
        }
    },
    //添加类目
    addCategory: (req, res, params) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            params.uid = uid;
            Factory.add(tb_name, params).then( ({insertId}) => {
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
    // 修改类目
    modifyCategory: (req, res, id, params) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.update(tb_name, id, params).then( data => {
                res.send(Factory.responseSuccess(data))
            })
        } else {
            res.send(Factory.responseError('uid为空'))
        }
    },
    // 批量删除类目
    removeCategory: (req, res, ids) => {
        let uid = Factory.getUid(req);
        if( uid ) {
            Factory.remove(tb_name, ids).then( data => {
                res.send(Factory.responseSuccess('', '删除成功'))
            })
        } else {
            res.send(Factory.responseError('uid为空'))
        }
    }
};

module.exports = CategoryService;