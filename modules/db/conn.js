// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost:27017/authentication", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("`connection successful");
//   })
//   .catch((e) => {
//     console.log(`no connection`);
//   });

const DB_URL = "your mongodb url";
module.exports = DB_URL;
