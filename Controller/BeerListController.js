var beerTable = require("../Db/Beer");
class BeerListController {
  async getBeerList(params) {
    return new Promise(async function(resolve, reject) {
      try {
        beerTable.find({}, (error, res) => {
          if (error) {
            resolve({
              success: 0,
              message: "Unable to get Beer List"
            });
          } else {
            resolve({
              success: 1,
              data: res
            });
          }
        });
      } catch (error) {
        console.log("error is", error);
        resolve({
          success: 0,
          message: "Unable to get Beer List"
        });
      }
    });
  }
}
module.exports = new BeerListController();
