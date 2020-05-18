const Sequelize = require('sequelize');
require('dotenv').config();

let conn = null;


if(process.env.NODE_ENV ==='production'){
    conn = new Sequelize('postgres', process.env.USERNAME, process.env.PASSWORD, {
        host: process.env.HOST,
        port: process.env.DB_PORT, 
        logging: console.log,
        maxConcurrentQueries: 100,
        dialect: 'postgres',
        dialectOptions: {
            ssl: 'Amazon RDS'
        },
        pool: {maxConnections: 5, maxIdleTime: 30},
        language: 'en'
    })
} else {
    conn = new Sequelize(process.env.DEV_DATABASE_URL);
}

module.exports = conn;