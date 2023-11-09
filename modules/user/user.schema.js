
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      require: true,
      type: String,
    },
    email: {
      require: true,
      type: String,
      unique: true,
    },
    password: {
      require: true,
      type: String,
    },
    status:{
        default: 0,
        type: Number
    },
  },
  { timestamps: true }
);

// user => model, file name
module.exports = mongoose.model("user", userSchema);