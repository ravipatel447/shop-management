const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: `${process.env.dbName}`,
  password: `${process.env.dbPassword}`,
});

module.exports = pool.promise();
