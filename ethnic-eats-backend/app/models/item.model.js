const mongoose = require("mongoose");

const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    createdDateTime: Date
  })
);

module.exports = Item;
