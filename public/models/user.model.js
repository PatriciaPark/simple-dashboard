const sql = require("./db.js");
const bcrypt = require("bcrypt");
// constructor
const User = function(user) {
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
};
const Login = function(user) {
  this.email = user.email;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
User.select = (email, password, result) => {
  sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user by email: ", res[0]);
      // Compare the password
      if(bcrypt.compare(password, res[0].password)){
        result(null, res[0]);
        return;
      } else {
        result({ kind: "not_found" }, null);
        return;
      }
      
    }
    // not found User password with the email
    result({ kind: "not_found" }, null);
  });
};
User.readOne = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user by id(email): ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found User with the email
    result({ kind: "not_found" }, null);
  });
};
User.readAll = (email, result) => {
  let query = "SELECT id, username, email, password, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt, DATE_FORMAT(updatedAt, '%Y-%m-%d %H:%i:%s') as updatedAt, loginCnt, DATE_FORMAT(lastSession, '%Y-%m-%d %H:%i:%s') as lastSession, emailVerification FROM users";
  if (email) {
    query += ` WHERE email LIKE '%${email}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};
User.readAuth = (email, result) => {
  sql.query(`SELECT * FROM users WHERE emailVerification=1 AND email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found User with the email
    result({ kind: "not_found" }, null);
  });
};
User.readCnt = (email, result) => {
  let query = "SELECT count(*) as visitors FROM users WHERE DATE_FORMAT(lastSession, '%Y-%m-%d') = CURDATE() ";
      query += `UNION ALL `;
      query += `SELECT round(count(*)/7) as visitors FROM users WHERE lastSession BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK ) AND NOW()`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Count Visitors: ", res);
    result(null, res);
  });
};
User.updateOne = (email, user, result) => {
  sql.query(
    "UPDATE users SET username = ? WHERE email = ?",
    [user.username, email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("updated user: ", { email: email, ...user });
      result(null, { email: email, ...user });
    }
  );
};
Login.updatePwd = (email, user, result) => {
  sql.query(
    "UPDATE users SET password = ? WHERE email = ?",
    [user.password, email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("updated user password: ", { email: email, ...user });
      result(null, { email: email, ...user });
    }
  );
};
Login.updateCnt = (email, user, result) => {
  sql.query(
    "UPDATE users SET loginCnt=loginCnt+1, lastSession=CURRENT_TIMESTAMP WHERE email = ?",
    [email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("updated user count: ", { email: email, ...user });
      result(null, { email: email, ...user });
    }
  );
};
Login.updateAuth = (email, user, result) => {
  sql.query(
    "UPDATE users SET emailVerification=1 WHERE email = ?",
    [email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("updated user email verification: ", { email: email, ...user });
      result(null, { email: email, ...user });
    }
  );
};
User.remove = (email, result) => {
  sql.query("DELETE FROM users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found user with the email
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user with email: ", email);
    result(null, res);
  });
};
User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};
module.exports = { User, Login };