console.log("HOST:", process.env.MYSQLHOST);
console.log("USER:", process.env.MYSQLUSER);
console.log("DB:", process.env.MYSQLDATABASE);
console.log("PORT:", process.env.MYSQLPORT);
const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;