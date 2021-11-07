const { User, Token } = require("../models");
const { randomBytes } = require("crypto");
const bcrypt = require("bcrypt");


const handleErrors = (err) => {
  let error = { name: "", username: "", email: "", password: "" };

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((errEle) => {
      if (errEle.properties.type === "unique") {
        error[
          errEle.properties.path
        ] = `${errEle.properties.path} already exits`;
      } else error[errEle.properties.path] = errEle.properties.message;
    });
  }
  return error;
};

const login = async (req, res) => {

  const password = req.body.password;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((auth) => {
            if (auth) {
              Token.findOne(
                { user: user._id }
              )

                .then((result) => {
                  if (result)
                  {
                    res.status(200).send({
                      token: result.token,
                    });
                    console.log("loggedin")
                  }
                })
                .catch((err) => console.log(err));
            } else {
              // console.log("WRONG LOGIN(Password) CREDENTIALS")
              res.status(400).send("WRONG LOGIN(Password) CREDENTIALS");
            }
          })
          .catch((err) => console.log(err));
      } else {
        // console.log("WRONG LOGIN(username) CREDENTIALS")
        res.status(400).send("WRONG LOGIN(username) CREDENTIALS");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const signin = async (req, res) => {
  User.create(req.body)
    .then((user) => {
      Token.create({
        user: user._id,
        token: randomBytes(40).toString("hex"),
      }).then((result) =>
        res.status(200).send({
          token: result.token,
        })
      );
    })
    .catch((err) => {
      const errors = handleErrors(err);
      res.status(403).send(errors);
      console.log(err);
    });
};

const profile = async (req, res) => {
  User.findById(req.user, { password: false }) // id = req.user
    .then((user) => res.status(200).send(user))
    .catch((err) => console.log(err));
};

module.exports = { login, signin, profile };
