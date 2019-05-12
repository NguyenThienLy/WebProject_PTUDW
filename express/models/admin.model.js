var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from admin');
    },

    add: (entity) => {
        return db.add('admin', entity);
    }
};