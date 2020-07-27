const conn = require('./database').conn;

conn.sync({force: true});