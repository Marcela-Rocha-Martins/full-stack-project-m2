const { Router } = require("express");
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const router = new Router();

// GET route to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

// POST route to handle the signup form submission
router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render("auth/signup", { errorMessage: "All fields are mandatory" });
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
      res.redirect('/profile-page');
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        console.log(
          "Username and email need to be unique. Either username or email is already taken."
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

// GET route to display the login form to users
router.get('/', (req, res) => res.redirect('/profile-page'));

// POST route to handle the login form submission
router.post('/', (req, res) => {
  // Your existing login logic and authentication here

  // Redirect the user to the profile page if login is successful
  res.redirect('/profile-page');
});

// GET route to display the profile page
router.get('/profile-page', (req, res) => res.render('profile-page'));

module.exports = router;
