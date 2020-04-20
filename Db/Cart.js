var mongoose = require("mongoose");
var env = require("../env")
var mongoDB = env.mongoUrl

mongoose.connect(mongoDB, { useNewUrlParser: true });

Schema = mongoose.Schema;

var CartSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    beer_info: {
      name: String,
      style: String,
      icon: String,
      price: Number,
      quantity: Number,
      unit: String
    },
    beer_id: String,
    user_id: String,
    number_of_items: Number
  },
  { collection: "beer_cart" }
);

module.exports = mongoose.model("cart", CartSchema);
