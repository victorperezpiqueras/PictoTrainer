var mysql = require('mysql');
require('dotenv').config();
/* var connection = mysql.createConnection({
    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
 */

/* ES UN POOL DE CONNECTIONS */
var connection = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
console.log('Connection host', process.env.DB_HOST);
console.log(connection);
module.exports = connection;
