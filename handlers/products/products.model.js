const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  price: Number,
  discount: Number,
  createdTime: { type: Date, default: Date.now },
});
exports.Product = mongoose.model("products", schema);
