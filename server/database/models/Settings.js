const conn = require('../connection');

const {Sequelize} = conn;

const Settings = conn.define('settings', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    darkMode: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    automaticTdee:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    activityLevel:{
        type: Sequelize.ENUM({
            values:['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active']
        })
    },
    bmr: {
        type: Sequelize.INTEGER,
    }, 
    tdee: {
        type: Sequelize.INTEGER,
    },
    protein:{
        type: Sequelize.INTEGER
    },
    fat: {
        type: Sequelize.INTEGER
    }, 
    carbs:{
        type: Sequelize.INTEGER,
    },
    proteinPercent:{
        type: Sequelize.FLOAT,
    },
    fatPercent:{
        type: Sequelize.FLOAT,
    },
    carbPercent:{
        type: Sequelize.FLOAT,
    },
});

module.exports = Settings;