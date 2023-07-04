const express = require("express");
const router = express.Router();

// Route to render the about-project view
router.get("/about-project", (req, res) => {
  res.render("about-project", { showButton: true });
});

// Route to handle the button click
router.post("/about-project", (req, res) => {
  // Logic to handle the button click goes here

  // Redirect to a different page after handling the button click
  res.redirect("/profile-page");
});

module.exports = router;
