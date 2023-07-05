const router = require("express").Router();

router.get("/about", (req, res) => {
  res.render("about-project");
});

module.exports = router;
