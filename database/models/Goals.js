const conn = require('../connection');

const {Sequelize} = conn;

const Goals = conn.define('goals', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    targetWeight: {
        type: Sequelize.FLOAT,
        required: true,
    },
    weightChange: {
        type: Sequelize.ENUM({
            values:['Gain', 'Lose', 'Maintain']
        }),
        defaultValue: 'Maintain',
        required: true,
    },
    change: {
        type: Sequelize.FLOAT,
        required: true,
    }
});


module.exports = Goals;