const sqlext = require('./sqlext');

const Sqlext = new sqlext();

const Factory = {
    get: async (table, id) => {
        let sql = `select * from ${table} where id=${id}`;
        let data = await Sqlext.exec(sql);
        return data[0];
    }
};

module.exports = Factory;