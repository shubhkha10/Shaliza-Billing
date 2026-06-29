const mysql = require("mysql2");

console.log("HOST:", process.env.MYSQLHOST);
console.log("DATABASE:", process.env.MYSQLDATABASE);
console.log("USER:", process.env.MYSQLUSER);
console.log("PORT:", process.env.MYSQLPORT);

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db;