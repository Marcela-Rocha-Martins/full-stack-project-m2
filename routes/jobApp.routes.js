const { Router } = require("express");
const Job = require("../models/Job.model");
const User = require("../models/User.model");

const router = new Router();

router.post("/jobs/create", (req, res, next) => {
  const {
    companyName,
    jobCV,
    coverLetter,
    jobApplicationDescription,
    jobCountry,
    jobCity
  } = req.body;

  Job.create({
    companyName,
    jobCV,
    coverLetter,
    jobApplicationDescription,
    jobCountry,
    jobCity
  })
    .then((newJob) => {
      return User.findByIdAndUpdate(User.email, {
        $push: { appliedJobs: newJob._id }
      });
    })
    .then(() => res.redirect("/jobs"))
    .catch((err) => {
      console.log(`Error while creating the job in the DB: ${err}`);
      next(err);
    });
});
router.get("/jobs", (req, res, next) => {
  Job.find()
    .then((dbJobs) => {
      console.log(`Jobs from the database: `, dbJobs);
    })
    .catch((err) => {
      console.log(`Err while getting the posts from the db`);
      next(err);
    });
});
module.exports = router;
