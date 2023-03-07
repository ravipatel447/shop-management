const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const User = require("./user");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE.UNSIGNED,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Product.belongsTo(User);

module.exports = Product;

// const Cart = require("./cart");
// const db = require("../util/database");

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute(
//       `INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)`,
//       [this.title, +this.price, this.description, this.imageUrl]
//     );
//   }

//   static deleteById(id) {}

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   static findById(id) {
//     return db.execute("SELECT * FROM products WHERE products.id = ? ", [id]);
//   }
// };
