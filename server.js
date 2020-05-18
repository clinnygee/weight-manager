const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const port = (8080);

app.use(express.static(path.join(__dirname, '/client/build')));

app.use(bodyParser.urlencoded({extended: false,}));

app.use(cookieParser());

app.use(bodyParser.json());

const conn = require('./database').conn;

const { User,
    Goals,
    BodyMeasurement,
    Weight,
    DaysFood,
    Meal,
    Food,} = require('./database').models;

conn.sync({logging: false, force: true});

User.createUser('clinnygee', 'clinton2', 12).then(user => {
    console.log(user);
})