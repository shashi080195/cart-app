var express = require("express");
var graphqlHTTP = require("express-graphql");
var beerSchema = require("./GraphQLSchema/beerList");
var customBeerSchema = require("./GraphQLSchema/CustomBeerList");
var app = express();

app.use(
  "/beer",
  graphqlHTTP({
    schema: beerSchema,
    graphiql: true
  })
);
app.listen(8000);
console.log("Running a GraphQL API server at localhost:8000");
