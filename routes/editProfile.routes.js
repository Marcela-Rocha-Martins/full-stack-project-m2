const router = require("express").Router();

router.get("/profile/edit", (req, res) => {
  res.render("edit-profile", { layout: "layout" });
});

module.exports = router;