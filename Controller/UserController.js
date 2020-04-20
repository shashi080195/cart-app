var userTable = require("../Db");
class UserController {
  getSingleUserByUsername(username) {
    return new Promise(function(resolve, reject) {
      try {
        userTable.findOne({ username: username }, (error, res) => {
          if (error) {
            resolve(false);
          }
          if (res === null) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      } catch (error) {
        resolve(false);
      }
    });
  }

  getUserIdByUsername(username) {
    return new Promise(function(resolve, reject) {
      try {
        userTable.findOne({ username: username }, (error, res) => {
          if (error) {
            resolve(false);
          }
          if (res === null) {
            resolve(false);
          } else {
            resolve(res);
          }
        });
      } catch (error) {
        resolve(false);
      }
    });
  }

  async getUserList(params) {
    const isUserAvailable = await this.getSingleUserByUsername(params.username);
    const { username, password } = params;
    return new Promise(async function(resolve, reject) {
      try {
        if (isUserAvailable) {
          userTable.findOne({ username, password }, (error, res) => {
            if (error) {
              resolve({
                success: 0,
                message: "Unable to login"
              });
            }
            if (res === null) {
              resolve({
                success: 0,
                message: "Incorrect username password pair"
              });
            } else {
              resolve({
                success: 1,
                message: "Sucessfully login"
              });
            }
          });
        } else {
          resolve({
            success: 0,
            message: "User not found"
          });
        }
      } catch (error) {
        console.log("error is", error);
        resolve({
          success: 0,
          message: "Unable to login"
        });
      }
    });
  }

  async addNewUser(params) {
    const isUserAvailable = await this.getSingleUserByUsername(params.username);
    return new Promise(function(resolve, reject) {
      try {
        if (isUserAvailable) {
          resolve({
            success: 0,
            message: "username already taken"
          });
        } else {
          var user = new userTable({
            username: params.username,
            email: params.email,
            password: params.password
          });
          user.save(function(err) {
            if (err) {
              resolve({
                success: 0,
                message: "unable to save user"
              });
            }
            resolve({
              success: 1,
              message: "user added successfully"
            });
          });
        }
      } catch (error) {
        resolve({
          success: 0,
          message: "unable to save user"
        });
      }
    });
  }
}
module.exports = new UserController();
