const { Router } = require("express");
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const router = new Router();

router.get("/signup", (res, req) => {});

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render("auth/signup", { errorMessage: "All fields are mandatory" });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
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
    // Uncomment this line later
    // .then(res.redirect('/userProfile'))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        console.log(
          "Username and email need to be unique. Either username or email is already taken"
        );
        res.status(500).render("auth/signup", {
          errorMessage:
            "User not found and/or incorrect password and email combination."
        });
      } else {
        next(error);
      }
    });
});

router.get("/login", (req, res) => res.send("Hello from the login page"));

router.get("/userProfile", (req, res) => res.send("This is your profile Page"));
module.exports = router;
