const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');

require('dotenv').config();

app.use(cors({origin: 'http://localhost:3000', credentials: true, preflightContinue: true}));

const port = (8080);
const AuthenticationRouter = require('./routes/Authentication/Authentication');
const UserRouter = require('./routes/User/User');
const SearchRouter = require('./routes/Search/Search');

app.use(express.static(path.join(__dirname, '/client/build')));

app.use(bodyParser.urlencoded({extended: false,}));

app.use(cookieParser());

app.use(bodyParser.json());





app.use('/api/authentication', AuthenticationRouter);
app.use('/api/user', UserRouter);
app.use('/api/search', SearchRouter);

const conn = require('./database').conn;

const { User,
    Goals,
    BodyMeasurement,
    Weight,
    DaysFood,
    Meal,
    Food,} = require('./database').models;

// conn.sync({logging: false, force: true});

// User.createUser('clinnygee', 'clinton2', 12).then(user => {
//     console.log(user);
// });


app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(port);