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
  // Retrieve all published Tutorials
  router.get("/published", users.findAllPublished);
  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);
  // Update a Tutorial with id
  router.put("/:id", users.update);
  // Delete a Tutorial with id
  router.delete("/:id", users.delete);
  // Delete all Tutorials
  router.delete("/", users.deleteAll);
  app.use('/api/users', router);
};

// const { verifySignUp } = require("../middleware");
// const controller = require("../controllers/auth.controller");

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post("/api/auth/signup",
    // [
    //   verifySignUp.checkDuplicateUsernameOrEmail,
    //   verifySignUp.checkRolesExisted
    // ],
//     controller.signup
//   );

//   app.post("/api/auth/signin", controller.signin);

//   app.post("/api/auth/signout", controller.signout);

// };