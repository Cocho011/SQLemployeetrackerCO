// config.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'mysqldb'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the mysqldb database.');
});

module.exports = connection;
