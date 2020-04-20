var mongoose = require("mongoose");
var env = require("../env")
var mongoDB = env.mongoUrl

mongoose.connect(mongoDB, { useNewUrlParser: true });

Schema = mongoose.Schema;

var BeerSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    abv: String,
    ibu: String,
    id: Number,
    name: String,
    style: String,
    ounces: Number,
    image: String,
    icon: String,
    price: Number,
    description: String,
    quantity: Number,
    unit: String
  },
  { collection: "beerList" }
);

module.exports = mongoose.model("beerList", BeerSchema);
