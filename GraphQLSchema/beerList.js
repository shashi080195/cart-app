var beerList = require("../Db/Beer");
var graphql = require("graphql");

var beerType = new graphql.GraphQLObjectType({
  name: "beer",
  fields: function() {
    return {
      id: {
        type: graphql.GraphQLID
      },
      abv: { type: graphql.GraphQLString },
      ibu: { type: graphql.GraphQLString },
      id: { type: graphql.GraphQLInt },
      name: { type: graphql.GraphQLString },
      style: { type: graphql.GraphQLString },
      ounces: { type: graphql.GraphQLInt },
      image: { type: graphql.GraphQLString },
      icon: { type: graphql.GraphQLString },
      price: { type: graphql.GraphQLInt },
      description: { type: graphql.GraphQLString },
      quantity: { type: graphql.GraphQLInt },
      unit: { type: graphql.GraphQLString }
    };
  }
});

const args = {
  style: { type: graphql.GraphQLString },
  id: { type: graphql.GraphQLString },
  name: { type: graphql.GraphQLString }
};
var beerQueryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: function() {
    return {
      beers: {
        type: new graphql.GraphQLList(beerType),
        args,
        resolve: function(_, { id = null, style = null, name = null }) {
          let obj = {};
          if (id !== null) {
            obj = { ...obj, id };
          } else if (name !== null) {
            obj = { ...obj, name: { $regex: "^" + name + ".*" } };
          } else {
            obj = style === null ? obj : { ...obj, style };
          }
          return new Promise(function(resolve, reject) {
            beerList.find(obj, function(err, res) {
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
      }
    };
  }
});

var beerSchema = new graphql.GraphQLSchema({ query: beerQueryType });
module.exports = beerSchema;
