const conn = require('../connection');

const {Sequelize} = conn;

const Food = conn.define('food', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    food_id:{
        type: Sequelize.STRING,
        required: true,
    },
    quantity:{
        type: Sequelize.FLOAT,
        required: true,
    },
    measurement:{
        type: Sequelize.STRING, 
        
    },
    ENERC_KCAL:{
        type: Sequelize.FLOAT,
        required: true,
    },
    PROCNT:{
        type: Sequelize.FLOAT,
    },
    FAT:{
        type: Sequelize.FLOAT,
    },
    CHOCDF:{
        type: Sequelize.FLOAT,
    }
});

module.exports = Food;