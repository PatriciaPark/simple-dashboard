const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Cross-Origin Resource Sharing, CORS
app.use(cors());
// cookie
app.use(cookieParser());
app.use(cookieSession({
    name: "pyjee8-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    // sameSite: "strict",
    cookie: {
      secureProxy: true,
      httpOnly: true,
      domain: "https://simple-dashboard-pyjee8.herokuapp.com/",
      expires: 3600
    }
  })
);

// Database
const db = require("./models");
const Role = db.role;
// db.sequelize.sync();

// simple route
// app.use(express.static("public"));
// index
app.get("/", (req, res, next) => {
  if(req.session.user){
    res.redirect("/dashboard");
  }else{
    res.sendFile(__dirname + "/index.html");
  }
});
// dashboard
app.get("/dashboard", function(req, res) {
  if(req.session.user){
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
    res.redirect("/");
  }
});
// resetPwd
app.get("/resetPwd", function(req, res) {
  if(req.session.user){
    res.sendFile(__dirname + "/views/resetPwd.html");
  }else{
    res.redirect("/");
  }
});
// emailVerification
app.get("/emailVerification", function(req, res) {
  if(req.session.user){
    res.sendFile(__dirname + "/views/emailVerification.html");
  }else{
    res.redirect("/");
  }
});
// logout
app.get("/logout", function(req, res) {
  // Clearing the cookie
  req.session = null;
  res.redirect("/");
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.status(404).sendFile(__dirname + "/404.html");
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});