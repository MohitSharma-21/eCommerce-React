const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  dbType: String,
  title: String,
  Description:String,
  price: String,
  img: String,
  type: String,
  // quantity: Number,
});

module.exports = model("Product", productSchema);
