const conn = require('../connection');

const {Sequelize} = conn;

const Meal = conn.define('meal', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING,
        required: true,
    }
});

module.exports = Meal;