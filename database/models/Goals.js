const conn = require('../connection');

const {Sequelize} = conn;

const Goals = conn.define('goals', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    targetWeight: {
        type: Sequelize.STRING,
        required: true,
    },
    weightLoss: {
        type: Sequelize.BOOLEAN,
        required: true,
    },
    change: {
        type: Sequelize.INTEGER,
        required: true,
    }
});


module.exports = Goals;