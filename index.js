// const dotenv = require("dotenv");
const userSchema = require("./modules/user/user.schema");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./modules/user/user.routes");
const DB_URL = require("./modules/db/conn");
app.use(express.json());

// const hbs = require("hbs");
// const path = require("path");
// const static_path = path.join(__dirname, "./modules/public");
// const template_path = path.join(__dirname, "./modules/templates/views");
// const partials_path = path.join(__dirname, "./modules/templates/partials");

// app.use(express.static(static_path));
// app.set("view engine", "hbs");
// app.set("views", template_path);
// hbs.registerPartials(partials_path);

// app.get("/", function (req, res) {
//   res.render("index"); // This assumes 'index' is the name of your view file
// });

// app.get("/signup", (req, res) => {
//   res.render("signup");
// });
// app.get("/login", (req, res) => {
//   res.render("login");
// });

app.get("/", async (req, res) => {
  res.send("home page");
});


app.use("/user", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log("App is running on port 3000");
  let conn;
  try {
    conn = await mongoose.connect(DB_URL);
    console.log("DB is now connected");
  } catch (e) {
    console.error(e);
  }
});
