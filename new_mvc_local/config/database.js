const mysql = require('mysql2');
const config = require('./config.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    multipleStatements: config.multipleStatements
});

module.exports = pool;