module.exports = app => {
  var router = require("express").Router();
  // dashboard
  router.get("/dashboard", function(req, res) {
    if(req.session.user){
      res.sendFile(__dirname + "/views/dashboard.html");
    }else{
      res.sendFile(__dirname + "/index.html");
    }
  });
  // editInfo
  router.get("/editInfo", function(req, res) {
    if(req.session.user){
      res.sendFile(__dirname + "/views/editInfo.html");
    }else{
      res.sendFile(__dirname + "/index.html");
    }
  });
  // resetPwd
  router.get("/resetPwd", function(req, res) {
    if(req.session.user){
      res.sendFile(__dirname + "/views/resetPwd.html");
    }else{
      res.sendFile(__dirname + "/index.html");
    }
  });
  // emailVerification
  router.get("/emailVerification", function(req, res) {
    if(req.session.user){
      res.sendFile(__dirname + "/views/emailVerification.html");
    }else{
      res.sendFile(__dirname + "/index.html");
    }
  });
  // logout
  router.get("/logout", function(req, res) {
    // Clearing the cookie
    req.session = null
    res.redirect("/");
  });
  app.use('/', router);
};