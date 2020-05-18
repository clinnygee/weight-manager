const conn = require('../connection');

const {Sequelize} = conn;

const Weight = conn.define('weight', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    reading: {
        type: Sequelize.FLOAT,
        required: true,
    },
});

module.exports = Weight;