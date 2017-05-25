const mysql = require('promise-mysql');
const pool = mysql.createConnection({
  host: "localhost",
  user: "home",
  password: "120183boom",
  database: "home"
});
var connect;

module.exports = connect ? connect : pool.then( con => connect = con);
