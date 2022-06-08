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
  // Check Passwords
  router.post("/pwd", users.check);
  // Retrieve all Tutorials
  router.get("/", users.getAll);
  // Retrieve visitor counts
  router.get("/count", users.getCnt);
  // Retrieve verified email user
  router.get("/email/:email", users.getAuth);
  // Retrieve a single Tutorial with id
  router.get("/:email", users.getOne);
  // Update a User with email
  router.put("/:email", users.setOne);
  // Update password
  router.put("/pwd/:email", users.setPwd);
  // Update login data
  router.put("/count/:email", users.setCnt);
  // Update verification data
  router.put("/email/:email", users.setAuth);
  // Delete a User with id
  router.delete("/:email", users.deleteOne);
  // Delete all Users
  router.delete("/", users.deleteAll);
  app.use('/api/users', router);
};