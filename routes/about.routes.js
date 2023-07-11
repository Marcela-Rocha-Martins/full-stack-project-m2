const router = require("express").Router();

router.get("/about/index", (req, res) => {
  res.render("about-project", { layout: "layout-index" });
});

router.get("/about", (req, res) => {
  res.render("about-project", { layout: "layout-about" });
});

module.exports = router;
