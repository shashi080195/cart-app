var mongoose = require("mongoose");
var env = require("../env")
var mongoDB = env.mongoUrl

mongoose.connect(mongoDB, { useNewUrlParser: true });

Schema = mongoose.Schema;

var userProfileSchema = new Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    contact: String,
    profile_pic: String,
    address: String,
    basic_info: {
      user_id: String,
      username: String,
      email: String
    }
  },
  { collection: "user_new_profile" }
);

module.exports = mongoose.model("user_new_profile", userProfileSchema);
