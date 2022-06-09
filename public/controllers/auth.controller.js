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
      else res.send(data);
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
      } else res.send(data);
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
          message: `Not found User with email ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.params.email
        });
      }
    } else res.send(data);
  });
};
// Find a single User with an email
exports.getOne = (req, res) => {
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
        } else res.send(data);
      });
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

// const db = require("../models");
// const config = require("../config/auth.config");
// const User = db.user;
// const Role = db.role;

// const Op = db.Sequelize.Op;

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// exports.signup = async (req, res) => {
//   // Save User to Database
//   try {
//     const user = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 8),
//     });

//     if (req.body.roles) {
//       const roles = await Role.findAll({
//         where: {
//           name: {
//             [Op.or]: req.body.roles,
//           },
//         },
//       });

//       const result = user.setRoles(roles);
//       if (result) res.send({ message: "User registered successfully!" });
//     } else {
//       // user has role = 1
//       const result = user.setRoles([1]);
//       if (result) res.send({ message: "User registered successfully!" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
  
//   //return res.redirect('../views/email_verification.html');
// };

// exports.signin = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         username: req.body.username,
//       },
//     });

//     if (!user) {
//       return res.status(404).send({ message: "User Not found." });
//     }

//     const passwordIsValid = bcrypt.compareSync(
//       req.body.password,
//       user.password
//     );

//     if (!passwordIsValid) {
//       return res.status(401).send({
//         message: "Invalid Password!",
//       });
//     }

//     const token = jwt.sign({ id: user.id }, config.secret, {
//       expiresIn: 86400, // 24 hours
//     });

//     let authorities = [];
//     const roles = await user.getRoles();
//     for (let i = 0; i < roles.length; i++) {
//       authorities.push("ROLE_" + roles[i].name.toUpperCase());
//     }

//     req.session.token = token;

//     return res.status(200).send({
//       id: user.id,
//       username: user.username,
//       email: user.email,
//       roles: authorities,
//     });
//   } catch (error) {
//     return res.status(500).send({ message: error.message });
//   }
// };

// exports.signout = async (req, res) => {
//   try {
//     req.session = null;
//     return res.status(200).send({
//       message: "You've been signed out!"
//     });
//   } catch (err) {
//     this.next(err);
//   }
// };

// exports.findOne = (req, res) => {
//   req.findById(req.params.id, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found User with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error retrieving User with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     });
// };

// exports.findAll = (req, res) => {
//   const email = req.query.email;
//   req.getAll(email, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving users."
//       });
//     else res.send(data);
//   });
// };