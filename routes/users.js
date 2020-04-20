var express = require("express");
var router = express.Router();
var userProfileController = require("../Controller/UserProfileController");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/create_profile", async function(req, res, next) {
  try {
    let resp = {};
    if (req.body.username) {
      resp = await userProfileController.createNewUserProfile(req.body);
      return res.json(resp);
    } else {
      return res.json({
        success: 0,
        message: "Username required while creating profile"
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
router.get("/get_profile/:username", async function(req, res, next) {
  try {
    let resp = {};
    console.log("req is", req.params.username);
    let username = req.params.username;
    if (username) {
      resp = await userProfileController.getUserProfile(username);
      return res.json(resp);
    } else {
      return res.json({
        success: 0,
        message: "userId not found"
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
module.exports = router;
