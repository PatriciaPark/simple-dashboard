const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();

// // set the view engine to ejs
// const path = require('path');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// cookie session
app.use(
  cookieSession({
    name: "pyjee8-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// // Count today's visitors
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
// res.end(count + 'visit')
// })

// Database
const db = require("./models");
const Role = db.role;

// db.sequelize.sync();

// simple route
app.use(express.static('public'));
app.get("/", (req, res) => {
  res.sendFile('./index.html', {root: __dirname })
  // res.json({ message: "Welcome to simple-dashboard application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/tutorial.routes")(app);

// The 404 Route
app.use(function(req,res){
  res.status(404).sendFile('./404.html');
});

// URL direct access prohibition
export async function getServerSideProps({ req, res, params }) {
  if (!req.headers.referer) {
    res.statusCode = 302
    res.setHeader('Location', `https://simple-dashboard-pyjee8.herokuapp.com/`) // Replace <link> with your url link
    res.end();
  }
  return {props: {}}
}

// set port, listen for requests
const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});