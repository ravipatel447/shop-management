const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./util/database");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
// db.execute("SELECT * FROM products")
//   .then(([res]) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// Product.belongsTo(User);
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

sequelize
  // .sync({ force: true })
  .sync()
  .then((res) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (user) {
      return user;
    } else {
      const user = User.create({ name: "ravi", email: "ravi@simform.com" });
      return user;
    }
  })
  // .then((user) => {
  //   const cart = user.getCart();
  //   console.log(cart);
  //   if (!cart) {
  //     // user.createCart();
  //   }
  //   return cart;
  // })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("this is err");
    console.log(err);
  });
