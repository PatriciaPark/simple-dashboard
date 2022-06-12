const { User, Login } = require("../models/user.model.js");
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a User
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else {
        // save session
        req.session.user = { email:req.params.email };
        res.send(data);
      }
    });
};
// Check Passwords
exports.select = (req, res) => {
  User.select(req.body.email, req.body.password, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User passwords ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User Password with email " + req.params.email
          });
        }
      } else {
        // save session
        req.session.user = { email:req.params.email };
        res.send(data);
      }
    });
};
// Retrieve all Users from the database (with condition).
exports.getAll = (req, res) => {
    const email = null;
    User.readAll(email, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
};
// Retrieve visitor counts.
exports.getCnt = (req, res) => {
  const email = null;
  User.readCnt(email, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving visitors."
      });
    else res.send(data);
  });
};
// Find email verified Users
exports.getAuth = (req, res) => {
  User.readAuth(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Verified User with email ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Verified User with email " + req.params.email
        });
      }
    } else res.send(data);
  });
};
// Find a single User with an email
exports.getOne = (req, res) => {
  if (req.params.email == 'null') {
    User.readOne(req.session.user.email, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with email ${req.session.user.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with email " + req.session.user.email
          });
        }
      } else {
        res.send(data);
      }
    });
  } else {
    User.readOne(req.params.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with email ${req.params.email}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with email " + req.params.email
            });
          }
        } else {
          // save session
          req.session.user = { email:req.params.email };
          res.send(data);
        }
      });
  }
};
// Update a User by the email in the request
exports.setOne = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  User.updateOne(
    req.params.email,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with email ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with email " + req.params.email
          });
        }
      } else res.send(data);
    }
  );
};
// Update password
exports.setPwd = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be null!"
    });
  }
  console.log(req.body);
  User.updatePwd(
    req.params.email,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User Password with email ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User Password " + req.params.email
          });
        }
      } else res.send(data);
    }
  );
};
// Update login data
exports.setCnt = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be null!"
    });
  }
  console.log(req.body);
  Login.updateCnt(
    req.params.email,
    new Login(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with email ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with email " + req.params.email
          });
        }
      } else res.send(data);
    }
  );
};
// Update verificationData data
exports.setAuth = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be null!"
    });
  }
  console.log(req.body);
  Login.updateAuth(
    req.params.email,
    new Login(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with email ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with email " + req.params.email
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a User with the specified id in the request
exports.deleteOne = (req, res) => {
    User.remove(req.params.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with email ${req.params.email}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with email " + req.params.email
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        else res.send({ message: `All Users were deleted successfully!` });
      });
};