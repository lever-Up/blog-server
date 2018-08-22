const sqlext = require('./sqlext');
const utils = require('../utils');

const Sqlext = new sqlext();

/**
 * sql通用接口工程类
 */
const Factory = {
    // 根据id获取表数据
    get: async (table, id) => {
        let sql = `select * from ${table} where id=${id}`;
        let data = await Sqlext.exec(sql);
        data = data[0];
        if(data && table === 'user') {
            delete data.password;
        }
        return data;
    },
    /**
     * 查询列表 @TODO 还差like查询
     *
     * @param table     数据表名
     * @param params
     *      {
     *         query: [
     *            { key: 'title', value: '测试' },
     *            { key: 'createTime', value: '2018-08-01', value2: '2018-08-15' },
     *            [
     *                { key: 'tagId', value: 1 },
     *                { key: 'tagId', value: 2 }
     *            ]
     *         ],
     *         sort: '-createTime',
     *         page: 0,
     *         count: 10
     *      }
     *
     *   sort排序方式， 默认-createTime降序，+升序 / -降序
     *
     * @returns {Promise<void>}
     */
    query: async (table, params) => {
        let { query=[], sort='-createTime', page=0, count=10} = params;

        let sql = `select * from ${table}`, values = [];
        if(query.length > 0) {
            let sqlAnd = [];
            query.map( firCon => {
                if(utils.isArray(firCon)) {
                    // or
                    if(firCon.length > 0) {
                        let temp = [];
                        firCon.map( secCon => {
                            if(secCon.value2) {
                                temp.push(`${secCon.key} between ? and ?`);
                                values.push(secCon.value);
                                values.push(secCon.value2);
                            } else {
                                temp.push(`${secCon.key}=?`);
                                values.push(secCon.value);
                            }
                        });
                        sqlAnd.push(temp.join(' or '));
                    }
                } else if(firCon.value2) {
                    // between and
                    sqlAnd.push(`${firCon.key} between ? and ?`);
                    values.push(firCon.value);
                    values.push(firCon.value2);
                } else {
                    // and
                    sqlAnd.push(`${firCon.key}=?`);
                    values.push(firCon.value);
                }
            });
            if(sqlAnd.length > 0) {
                sql += ` where ${sqlAnd.join(' and ')}`
            }
        }
        // 排序
        if(sort) {
            let sortType = sort.indexOf('-')===0?'desc':'asc';
            let sortKey = sort.substr(1, sort.length);
            sql += ` order by ${sortKey} ${sortType}`
        }else{
            sql += ` order by createTime desc`
        }
        // 分页
        sql += ` limit ${page*count}, ${count}`;

        return await Sqlext.exec(sql, values);
    },
    // 添加表数据
    add: async (table, params) => {
        let keys = [], keys2 = [], values = [];
        Object.keys(params).map( key => {
            keys.push(key);
            keys2.push('?');
            values.push(params[key]);
        });
        let sql = `insert into ${table} (${keys.join(',')}) values(${keys2.join(',')})`;
        return await Sqlext.exec(sql, values);
    },
    // 更新表数据
    update: async (table, id, params) => {
        let keys = [], values = [];
        Object.keys(params).map( key => {
            keys.push(`${key}=?`);
            values.push(params[key])
        });
        let sql = `update ${table} set ${keys.join(',')} where id=${id}`;
        return await Sqlext.exec(sql, values);
    },
    // 删除表数据 单个/批量
    remove: async (table, ids) => {
        let sqls = [];
        if(ids instanceof Array) {
            sqls = ids.map( id => `delete from ${table} where id='${id}'`)
        }else{
            sqls.push(`delete from ${table} where id='${ids}'`)
        }
        return await Sqlext.exec(sqls.join(';'))
    },
    // 执行sql命令
    exec: async (sql, values) => {
        return await Sqlext.exec(sql, values);
    },
    // 查询用户id，从cookie的token里面取
    getUid: (req) => {
        let token = req.signedCookies.token;
        if(token) {
            return cache.get(token);
        }
        return null;
    },
    // 封装返回客户端的数据
    responseSuccess: (data, msg='success') => {
        return { code:0, msg, data }
    },
    // 封装返回客户端的错误数据
    responseError: (msg) => {
        return { code:-1, msg }
    }
};

module.exports = Factory;