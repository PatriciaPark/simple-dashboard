const sql = require("./db.js");
// constructor
const User = function(user) {
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
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
User.findById = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = ${email}`, (err, res) => {
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
    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};
User.getAll = (email, result) => {
  let query = "SELECT * FROM users";
  if (email) {
    query += ` WHERE title LIKE '%${email}%'`;
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
User.findByEmailVerified = (email, result) => {
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
    // not found User with the id
    result({ kind: "not_found" }, null);
    console.log("*****result: " + result);
  });
};
User.updateById = (email, user, result) => {
  sql.query(
    "UPDATE users SET username = ?, password = ? WHERE email = ?",
    [user.username, user.password, email],
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
User.updateLogin = (email, result) => {
  sql.query(
    "UPDATE users SET loginCnt=loginCnt+1, lastSession=CURRENT_TIMESTAMP WHERE email = ?",
    [email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null, res);
    }
  );
};
User.updateEmailVerification = (email, result) => {
  sql.query(
    "UPDATE users SET emailVerification=1 WHERE email = ?",
    [email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null, res);
    }
  );
};
User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user with id: ", id);
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
module.exports = User;