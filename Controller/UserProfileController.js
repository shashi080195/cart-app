var userTable = require("../Db");
var userProfileTable = require("../Db/UserProfile");
var userController = require("./UserController");
class UserProfileController {
  async createNewUserProfile(params) {
    const isUserAvailable = await userController.getUserIdByUsername(
      params.username
    );
    const isUserProfileAvailable = await this.getUserProfileByUsername(
      params.username
    );
    return new Promise(function(resolve, reject) {
      try {
        if (isUserAvailable !== false) {
          var UserProfile = new userProfileTable({
            name: params.name,
            contact: params.contact,
            profile_pic: params.profile_pic,
            address: params.address,
            basic_info: {
              user_id: isUserAvailable._id,
              username: isUserAvailable.username,
              email: isUserAvailable.email
            }
          });
          if (
            isUserProfileAvailable.success === 0 ||
            isUserProfileAvailable.data === null
          ) {
            UserProfile.save(function(err) {
              if (err) {
                resolve({
                  success: 0,
                  message: "unable to create profile"
                });
              }
              resolve({
                success: 1,
                message: "user profile created successfully"
              });
            });
          } else {
            let updateBody = {};
            userProfileTable.updateOne(
              { _id: isUserProfileAvailable.data._id },
              { $set: params },
              function(err, res) {
                if (err) {
                  resolve({
                    success: 0,
                    message: "unable to create profile"
                  });
                }
                resolve({
                  success: 1,
                  message: "user profile created successfully"
                });
              }
            );
          }
        } else {
          resolve({
            success: 0,
            message: "user not found"
          });
        }
      } catch (error) {
        console.log(error);
        resolve({
          success: 0,
          message: "unable to save user"
        });
      }
    });
  }

  async getUserProfile(username) {
    return new Promise(function(resolve, reject) {
      userProfileTable.findOne(
        { "basic_info.username": username },
        (error, res) => {
          if (error) {
            resolve({
              success: 0,
              message: "Unable to get user profile"
            });
          } else {
            resolve({
              success: 1,
              data: res
            });
          }
        }
      );
    });
  }

  async getUserProfileByUsername(username) {
    return new Promise(function(resolve, reject) {
      userProfileTable.findOne(
        { "basic_info.username": username },
        (error, res) => {
          if (error) {
            resolve({
              success: 0,
              message: "Unable to get user profile"
            });
          } else {
            resolve({
              success: 1,
              data: res
            });
          }
        }
      );
    });
  }
}
module.exports = new UserProfileController();
