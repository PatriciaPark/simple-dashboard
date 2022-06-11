module.exports = app => {
  var router = require("express").Router();
  // dashboard
  router.get("/dashboard", function(req, res) {
    if(req.session.user){
      console.log("************************page: " + req.session.user.email);
      sessionStorage.setItem('userSIEmail', req.session.user.email);
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
  // email_verification
  router.get("/email_verification", function(req, res) {
    if(req.session.user){
      res.sendFile(__dirname + "/views/email_verification.html");
    }else{
      res.sendFile(__dirname + "/index.html");
    }
  });
  // logout
  router.get("/logout", function(req, res) {
    // Clearing the cookie
    req.session = null
    // res.clearCookie("pyjee8-session",{path:"/",domain:"https://simple-dashboard-pyjee8.herokuapp.com/"});
    res.redirect("/");
  });
  app.use('/', router);
};