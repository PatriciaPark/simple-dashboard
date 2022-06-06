const { verifySignUp } = require("../middleware");

module.exports = app => {
  const users = require("../controllers/auth.controller.js");
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/", 
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    users.create);
  // Retrieve all Tutorials
  router.get("/", users.findAll);
  // Retrieve verified email user
  router.get("/:email", users.findVerified);
  // Retrieve visitor counts
  router.get("/visitors", users.visitors);
  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);
  // Update a User with id
  router.put("/:id", users.update);
  // Update login data
  router.put("/loginCount/:email", users.loginCount);
  // Update verification data
  router.put("/verificationData/:email", users.verificationData);
  // Delete a User with id
  router.delete("/:id", users.delete);
  // Delete all Users
  router.delete("/", users.deleteAll);
  app.use('/api/users', router);
};