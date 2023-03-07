// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: `${process.env.dbName}`,
//   password: `${process.env.dbPassword}`,
// });

// module.exports = pool.promise();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  `${process.env.dbName}`,
  "root",
  `${process.env.dbPassword}`,
  {
    dialect: "mysql",
    host: "localhost",
  }
);
module.exports = sequelize;
