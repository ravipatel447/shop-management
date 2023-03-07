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
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

sequelize
  .sync()
  .then((res) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (user) {
      return user;
    } else {
      return User.create({ name: "ravi", email: "ravi@simform.com" });
    }
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("this is err");
    console.log(err);
  });
