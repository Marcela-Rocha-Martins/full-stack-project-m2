const { Router } = require("express");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const router = new Router();

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      console.log(`Password hash: ${hashedPassword}`);
    })
    .catch((error) => next(error));
});
module.exports = router;
