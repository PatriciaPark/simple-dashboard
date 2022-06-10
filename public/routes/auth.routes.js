const { verifySignUp } = require("../middleware");

module.exports = app => {
  const users = require("../controllers/auth.controller.js");
  var router = require("express").Router();
  router.route('/api/users/').get(function(req,res, next){
    console.log('***********************************/api/users/ called.' + req.session.user);
    if(req.session.user){
        next();
    }else{
        res.redirect('./index.html');
    }
  });
  // Create a new User
  router.post("/create", 
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  users.create);
  // Retrieve a user with email POST
  router.post("/select", users.select);
  // Retrieve all users
  router.get("/", users.getAll);
  // Retrieve visitor counts
  router.get("/count", users.getCnt);
  // Retrieve verified email user
  router.get("/email/:email", users.getAuth);
  // Retrieve a single user with email
  router.get("/:email", users.getOne);
  // Update a user with email
  router.put("/:email", users.setOne);
  // Update password
  router.put("/pwd/:email", users.setPwd);
  // Update login data
  router.put("/count/:email", users.setCnt);
  // Update verification data
  router.put("/email/:email", users.setAuth);
  // Delete a user with email
  router.delete("/:email", users.deleteOne);
  // Delete all users
  router.delete("/", users.deleteAll);
  app.use('/api/users', router);
};