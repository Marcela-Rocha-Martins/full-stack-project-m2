const { Router } = require("express");
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const router = new Router();

// GET route to display the signup form to users
router.get("/signup", (req, res) => res.render("signup"));

// POST route to handle the signup form submission
router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render("/signup", { errorMessage: "All fields are mandatory" });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage:
        "Password needs to have at least 6 characters and must contain at least one number, one lowercase, and one uppercase letter."
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
    .then(() => {
      // Redirect the user to the profile page after successful signup
      res.redirect("/profile-page");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        console.log(
          "Username and email need to be unique. Either username or email is already taken."
        );
        res.status(500).render("/signup", {
          errorMessage:
            "User not found and/or incorrect password and email combination."
        });
      } else {
        next(error);
      }
    });
});

// GET route to display the login form to users
router.get("/login", (req, res, next) => res.render("/index"));

// POST route to handle the login form submission
router.post("/profile-page", (req, res, next) => {
  // Your existing login logic and authentication here
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("index", {
      errorMessage: "Please enter both email and password to login"
    });
    return;
  }
  // Redirect the user to the profile page if login is successful
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("index", {
          errorMessage: "User not found and/or incorrrect password"
        });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        res.render("profile-page", { user });
      } else {
        res.render("index", {
          errorMessage: "User not found/and or incorrect password"
        });
      }
    })
    .catch((error) => next(error));
});

// GET route to display the profile page
router.get("/profile-page", (req, res) => res.render("profile-page"));

module.exports = router;
