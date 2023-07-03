const { Router } = require("express");
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const router = new Router();

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      User.create({
        username,
        email,
        passwordHash: hashedPassword
      });
    })
    .then((user) => {
      console.log("Newly created user is: ", user);
    })
    .catch((error) => next(error));
});
module.exports = router;
