const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Product = require("../models/product");
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.hasMany(Product);
// User.hasMany(Product);

module.exports = User;
