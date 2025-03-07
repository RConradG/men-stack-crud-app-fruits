const mongoose = require("mongoose");

const fruitSchema = new monggose.Schema({
  name: String,
  isReadyToEat: Boolean
});

const Fruit = mongoose.model("Fruit", fruitSchema);

module.exports = Fruit;
// this module exports the fruit model
// the fruit model provides us with a