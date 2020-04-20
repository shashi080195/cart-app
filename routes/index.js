var express = require("express");
var router = express.Router();
var userController = require("../Controller/UserController");
var beerListController = require("../Controller/BeerListController");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* check login  */
router.post("/login", async function(req, res, next) {
  try {
    let resp = {};
    resp = await userController.getUserList(req.body);
    if (req.body.username && req.body.password) {
      return res.json(resp);
    } else {
      return res.json({
        success: 0,
        message: "Insufficient number of parameters sent"
      });
    }
  } catch (error) {
    console.log("error is", error);
    return res.json({
      success: 0,
      message: "Unable to reach server"
    });
  }
});

/** new  user registration */
router.post("/signup", async function(req, res, next) {
  try {
    if (req.body.username && req.body.password) {
      let resp = await userController.addNewUser(req.body);
      console.log("resp is", resp);
      return res.json(resp);
    } else {
      return res.json({
        success: 0,
        message: "Insufficient number of parameters sent"
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Unable to reach server"
    });
  }
});

router.get("/beer", async function(req, res, next) {
  try {
    let resp = await beerListController.getBeerList();
    return res.json(resp);
  } catch (error) {
    return res.json({
      success: 0,
      message: "Unable to reach server"
    });
  }
});
module.exports = router;
