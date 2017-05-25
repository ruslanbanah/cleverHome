const mysql = require('promise-mysql');

module.exports = mysql.createConnection({
  host: "localhost",
  user: "home",
  password: "120183boom",
  database: "home"
});