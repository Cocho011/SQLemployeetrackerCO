// config.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bluedot$8712',
    database: 'mysqldb'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the mysqldb database.');
});

module.exports = connection;
