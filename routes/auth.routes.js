const { Router } = require("express");
const User = require("../models/User.model");
const Job = require("../models/Job.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const router = new Router();
const mongoose = require("mongoose");

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guards");

router.get("/signup", (req, res) => res.render("signup", { layout: "layout-index" }));


router.post("/signup", (req, res, next) => {
  const { email, username, firstName, lastName, password } = req.body;
  console.log(req.body);

  if (!username || !firstName || !lastName || !email || !password) {
    res.render("signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, first name, last name, email, and password."
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!regex.test(password)) {
    res.status(500).render("signup", {
      errorMessage:
        "Password must be at least 6 characters long, one lower case, upper case and special characters"
    });

    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword
      });
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.redirect("/profile-page");
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(500).render("signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("signup", {
          errorMessage: "Username or email already exists."
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
  console.log("SESSION =====> ", req.session);
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
        // console.log(user);
        req.session.currentUser = user;
        res.render("profile-page", { userInSession: req.session.currentUser, });
      } else {
        res.render("index", {
          errorMessage: "User not found/and or incorrect password"
        });
        return; 
      }
    })
    .catch((error) => next(error));
});

//GET route to display the profile page
router.get("/profile-page", async (req, res) => {
  try {
    const jobs = await Job.find({ creator: req.session.currentUser }).exec();
    res.render("profile-page", { userInSession: req.session.currentUser, jobs });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

// GET route to display the profile page

router.get("/profile-page", isLoggedIn, (req, res) => {
  // req.session.currentUser = user;
  res.render("profile-page", { userInSession: req.session.currentUser });
});
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
