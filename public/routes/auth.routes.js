const { verifySignUp } = require("../middleware");

module.exports = app => {
  const users = require("../controllers/auth.controller.js");
  var router = require("express").Router();
  // Create a new User
  router.post("/", 
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    users.create);
  // Retrieve all Tutorials
  router.get("/", users.findAll);
  // Retrieve visitor counts
  router.get("/count", users.visitors);
  // Retrieve verified email user
  router.get("/:email", users.findVerified);
  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);
  // Update a User with id
  router.put("/:id", users.update);
  // Update login data
  router.put("/loginCount/:email", users.loginCount);
  // Update verification data
  router.put("/verificationData/:email", users.verificationData);
  // Delete a User with id
  router.delete("/:email", users.delete);
  // Delete all Users
  router.delete("/", users.deleteAll);
  app.use('/api/users', router);
};