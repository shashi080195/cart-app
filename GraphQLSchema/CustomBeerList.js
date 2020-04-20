var beerList = require("../Db/Beer");
var graphql = require("graphql");

var schema = new graphql.buildSchema(`
    type Beer {
    abv: String,
    ibu: String,
    id: Int,
    name: String,
    style: String,
    ounces: Float,
    image: String,
    icon: String,
    price: Int,
    description: String,
    quantity: String,
    unit: String
    }
    
    type Query {
        beers(id:String):[Beer]
    }

`);

var root = {
  beers: function({ id = null, name = null, style = null }) {
    let obj = {};
    if (id !== null) {
      obj = { ...obj, id };
    } else if (name !== null) {
      obj = { ...obj, name: { $regex: "^" + name + ".*" } };
    } else {
      obj = style === null ? obj : { ...obj, style };
    }
    return new Promise(function(resolve, reject) {
      beerList.find({}, function(err, res) {
        if (!err) {
          if (res instanceof Array) {
            resolve(res);
          } else {
            resolve([...[], res]);
          }
        } else {
          reject(err);
        }
      });
    });
  }
};

const querySchema = {
  schema,
  root
};
module.exports = querySchema;
