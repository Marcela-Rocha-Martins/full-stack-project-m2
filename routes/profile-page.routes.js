const { Router } = require("express");
const router = Router();
const Job = require("../models/Job.model");


// Route for filtering jobs based on category
router.get("/filter-jobs", async (req, res, next) => {
  const { category, status } = req.query;
  const query = {};

  if (category) {
    query.category = category;
  }

  if (status) {
    query.status = status;
  }

  try {
    const jobs = await Job.find(query).exec();
    res.render("profile-page", { userInSession: req.session.currentUser, jobs });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
