const { Router } = require("express");

const router = new Router();
router.get("/signup", (req, res) => {
  res.send("Hello from the signup page");
});
module.exports = router;
