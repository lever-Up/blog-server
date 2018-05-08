const sqlext = require('./sqlext');

const Sqlext = new sqlext();

const Factory = {
    get: async (table, id) => {
        let sql = `select * from ${table} where id=${id}`;
        let data = await Sqlext.exec(sql);
        return data[0];
    },
    query: async (table, params) => {

    },
    add: async (table, params) => {

    },
    update: async (table, id, params) => {

    },
    remove: async (table, id) => {

    },
    exec: async (sql, values) => {
        return await Sqlext.exec(sql, values);
    }
};

module.exports = Factory;