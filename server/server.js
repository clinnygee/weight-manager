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
const FoodRouter = require('./routes/Food/Food');

app.use(express.static(path.resolve(__dirname + '/../client/build')));



app.use(bodyParser.urlencoded({extended: false,}));

app.use(cookieParser());

app.use(bodyParser.json());





app.use('/api/authentication', AuthenticationRouter);
app.use('/api/user', UserRouter);
app.use('/api/search', SearchRouter);
app.use('/api/food', FoodRouter);

const conn = require('./database').conn;
console.log(conn);
conn.sync();

app.get('/*', (req, res) => {
    const ReactApp = path.resolve(__dirname + '/../client/build/index.html');
    res.sendFile(ReactApp);
});


app.listen(port);