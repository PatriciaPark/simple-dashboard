const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
// var router = require("express").Router();
// const expressSession = require("express-session");

// // set the view engine to ejs
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

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
    sameSite: "strict",
    cookie: {
      secureProxy: true,
      httpOnly: true,
      domain: "https://simple-dashboard-pyjee8.herokuapp.com/",
      expires: 3600
    }
  })
);

// cookie session
// app.use(expressSession({
//   secret:"COOKIE_SECRET",
//   resave:true,
//   saveUninitialized:true
// }));


// // Count today"s visitors
// var count = 0;
// app.use(function (req, res, next) {
//   var date = new Date();
//   var today=date.getYear()+" "+date.getMonth()+" "+date.getDate();
// // Update views
// console.log(req.session.lastVisit);
// if(req.session.lastVisit != today){
//   req.session.lastVisit = today;
//   count++;
// }
// // Write response
// res.end(count + "visit")
// })

// Database
const db = require("./models");
const Role = db.role;
// db.sequelize.sync();

// path.join here makes it work cross platform with Windows / Linux / etc
// var statics = express.static(path.join(__dirname, "public"));
// function secureStatic(pathsToSecure = []) {
//   return function (req, res, next) {
//     if (pathsToSecure.length === 0) {
//       // Do not secure, forward to static route
//       return statics(req, res, next);
//     }
//     if (pathsToSecure.indexOf(req.path) > -1) {
//       // Stop request
//       return res.status(403).send("<h1>403 Forbidden</h1>"); 
//     }
//     // forward to static route
//     return statics(req, res, next); 
//   };
// }
// add public files. List all "private" paths (file)
// instead of app.use(express.static("public"));
// app.use(secureStatic(["*.html"])); 

// simple route
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  if(req.session.user){
    res.sendFile(__dirname + "/views/dashboard.html");
  }else{
    // Clearing the cookie
    res.sendFile(__dirname + "/index.html");
  }
  // res.redirect("./index.html");
  // res.sendFile("./index.html", {root: __dirname })
  // res.json({ message: "Welcome to simple-dashboard application." });
});

// dashboard
app.get("/dashboard", function(req, res) {
  if(req.session.user){
    sessionStorage.setItem('userSIEmail', req.session.user.email);
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
  req.session = null;
  res.redirect("/");
});

// routes
require("./routes/auth.routes")(app);
// require("./routes/page.routes")(app);
require("./routes/user.routes")(app);
require("./routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});