const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '',
  user : '',
  password : '',
  database : 'tuktuktravel'
});

module.exports = connection;