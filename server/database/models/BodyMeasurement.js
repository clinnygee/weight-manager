const conn = require('../connection');

const {Sequelize} = conn;

const BodyMeasurement = conn.define('bodymeasurement', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    height: {
        type: Sequelize.INTEGER,
        required: true,
    },
    naval:{
        type: Sequelize.FLOAT,
        required: false,
    },
    neck: {
        type: Sequelize.FLOAT,
        required: false,
    }
});

module.exports = BodyMeasurement;