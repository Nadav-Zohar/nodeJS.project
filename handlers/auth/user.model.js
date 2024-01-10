const mongoose = require("mongoose");

const schema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const User = mongoose.model("users", schema);

exports.User = User;
