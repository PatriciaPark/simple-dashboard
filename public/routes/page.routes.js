module.exports = app => {
  // dashboard
  app.get("/dashboard", function(req, res) {
    if(req.session.user){
      console.log("************************page: " + req.session.user.email);
      // sessionStorage.setItem('userSIEmail', req.session.user.email);
      res.sendFile(__dirname + "/views/dashboard.html");
    }else{
      res.sendFile(__dirname + "/index.html");
    }
  });
  // editInfo
  app.get("/editInfo", function(req, res) {
    if(req.session.user){
      res.sendFile(__dirname + "/views/editInfo.html");
    }else{
      res.sendFile(__dirname + "/index.html");
    }
  });
  // resetPwd
  app.get("/resetPwd", function(req, res) {
    if(req.session.user){
      res.sendFile(__dirname + "/views/resetPwd.html");
    }else{
      res.sendFile(__dirname + "/index.html");
    }
  });
  // email_verification
  app.get("/email_verification", function(req, res) {
    if(req.session.user){
      res.sendFile(__dirname + "/views/email_verification.html");
    }else{
      res.sendFile(__dirname + "/index.html");
    }
  });
  // logout
  app.get("/logout", function(req, res) {
    // Clearing the cookie
    req.session = null
    // res.clearCookie("pyjee8-session",{path:"/",domain:"https://simple-dashboard-pyjee8.herokuapp.com/"});
    res.redirect("/");
  });
};