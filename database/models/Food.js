const conn = require('../connection');

const {Sequelize} = conn;

const Food = conn.define('food', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    food_id:{
        type: Sequelize.INTEGER,
        required: true,
    },
    measurement_id:{
        type: Sequelize.INTEGER,
    }
});

module.exports = Food;