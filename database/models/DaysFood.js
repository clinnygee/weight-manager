const conn = require('../connection');

const {Sequelize} = conn;

const DaysFood = conn.define('daysfood', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
});

module.exports = DaysFood;