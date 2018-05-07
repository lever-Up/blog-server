const mysql  = require('mysql');
const tables = require('./tables.json');
const db = require('./db.json');

class SqlExt {

    constructor(props) {
        this.mysqlPool = mysql.createPool({
            host     : db.host,
            user     : db.user,
            password : db.password,
            port: '3306',
            database: db.database,
            multipleStatements: true,
            stringifyObjects: true
        });
    }

    init() {
        Object.keys(tables).map( key => {
            let arr = tables[key], sql, fields;
            fields = Object.keys(arr).map( field => `${field} ${arr[field]}`);
            sql = `CREATE TABLE IF NOT EXISTS ${key} (${fields.join(',')})`;
            this.exec(sql);
        })
    }

    exec(sql, values) {
        return new Promise( (resolve, reject) => {
            this.mysqlPool.getConnection( (error, connection) => {
                connection.query(sql, values, function(err, results) {
                    if(err) {
                        reject({status:500, msg: '查询语句异常'})
                    }
                    resolve(results);
                });
                this._release(connection);
            })
        });
    }

    /* 返回连接池 */
    _release(connection) {
        connection.release( (err) => {
            if(err) {
                console.log('关闭数据库连接异常！', err);
            }
        });
    }
}

module.exports = SqlExt;