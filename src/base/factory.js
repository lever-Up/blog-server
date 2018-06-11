const sqlext = require('./sqlext');
const utils = require('../utils');

const Sqlext = new sqlext();

const Factory = {
    get: async (table, id) => {
        let sql = `select * from ${table} where id=${id}`;
        let data = await Sqlext.exec(sql);
        return data[0];
    },
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
    update: async (table, id, params) => {
        let keys = [], values = [];
        Object.keys(params).map( key => {
            keys.push(`${key}=?`);
            values.push(params[key])
        });
        let sql = `update ${table} set ${keys.join(',')} where id=${id}`;
        return await Sqlext.exec(sql, values);
    },
    remove: async (table, ids) => {
        let sqls = [];
        if(ids instanceof Array) {
            sqls = ids.map( id => `delete from ${table} where id=${id}`)
        }else{
            sqls.push(`delete from ${table} where id=${ids}`)
        }
        return await Sqlext.exec(sqls.join(';'))
    },
    exec: async (sql, values) => {
        return await Sqlext.exec(sql, values);
    },
    getUid: (req) => {
        return req.get('uid')
    },
    responseSuccess: (data, msg='success') => {
        return { code:0, msg, data }
    },
    responseError: (msg) => {
        return { code:-1, msg }
    }
};

module.exports = Factory;