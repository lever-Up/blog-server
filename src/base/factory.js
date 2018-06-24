const sqlext = require('./sqlext');
const utils = require('../utils');

const Sqlext = new sqlext();

/**
 * sql通用接口工程类
 */
const Factory = {
    // 根据id获取数据库数据
    get: async (table, id) => {
        let sql = `select * from ${table} where id=${id}`;
        let data = await Sqlext.exec(sql);
        return data[0];
    },
    // 查询数据库
    query: async (table, params, sort) => {
        let sql = `select * from ${table}`, values = [];
        if(params && !utils.isEmpty(params)) {
            sql += ' where 1=1';
            Object.keys(params).map( key => {
                sql += ` and ${key}=?`;
                values.push(params[key]);
            });
        }
        if(sort) {
            sql += ` order by ${sort} ${sort.indexOf('-')===0?'desc':'asc'}`
        }else{
            sql += ` order by createTime desc`
        }
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
            sqls = ids.map( id => `delete from ${table} where id=${id}`)
        }else{
            sqls.push(`delete from ${table} where id=${ids}`)
        }
        return await Sqlext.exec(sqls.join(';'))
    },
    // 执行sql命令
    exec: async (sql, values) => {
        return await Sqlext.exec(sql, values);
    },
    // 查询用户id，从cookie的token里面取 TODO 待验证
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