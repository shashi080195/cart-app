var userTable = require("../Db");
var graphql = require("graphql");
var userType = new graphql.GraphQLObjectType({
  name: "user",
  fields: function() {
    return {
      id: {
        type: graphql.GraphQLID
      },
      username: {
        type: graphql.GraphQLString
      },
      email: {
        type: graphql.GraphQLString
      },
      password: {
        type: graphql.GraphQLString
      }
    };
  }
});

var userQueryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: function() {
    return {
      users: {
        type: new graphql.GraphQLList(userType),
        resolve: function() {
          return new Promise(function(resolve, reject) {
            userTable.find({}, (err, res) => {
              if (!err) {
                resolve(res);
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

var userSchema = new graphql.GraphQLSchema({
  query: userQueryType
});

module.exports = userSchema;
