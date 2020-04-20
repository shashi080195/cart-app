var mongoose = require("mongoose");
var env = require("../env")
var mongoDB = env.mongoUrl

mongoose.connect(mongoDB, { useNewUrlParser: true }).then(
  () => {
    console.log(
      `ready to use. The mongoose.connect() promise resolves to mongoose instance`
    );
  },
  err => {
    console.log("erros is", error);
  }
);

Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String
  },
  { collection: "user_new" }
);

module.exports = mongoose.model("user_new", userSchema);
