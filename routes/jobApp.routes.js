const { Router } = require("express");
const Job = require("../models/Job.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

const router = new Router();

router.get("/jobs/create", (req, res) => {
  res.render("job-application");
});

router.post(
  "/jobs/create",
  fileUploader.single("jobFiles"),
  (req, res, next) => {
    const {
      creator,
      companyName,
      jobTitle,
      jobApplicationDescription,
      jobCountry,
      jobCity,
      dateApplied
    } = req.body;
    const files = req.files;
    console.log("FILES:", files);

    Job.create({
      companyName,
      jobTitle,
      jobFiles: req.file.path,
      jobApplicationDescription,
      jobCountry,
      jobCity,
      dateApplied
    })
      .then((newJob) => {
        console.log("Creator:", creator);
        return User.findByIdAndUpdate(creator, {
          $push: { appliedJobs: newJob._id }
        });
      })

      .then(() => res.redirect("/jobs"))
      .catch((err) => {
        console.log(`Error while creating the job in the DB: ${err}`);
        next(err);
      });
  }
);
router.get("/jobs", (req, res, next) => {
  Job.find()
    .then((dbJobs) => {
      console.log(`Jobs from the database: `, dbJobs);
      res.render("job-view", { dbJobs });
    })
    .catch((err) => {
      console.log(`Err while getting the posts from the db`);
      next(err);
    });
});

router.post("/jobs/:jobId/delete", (req, res, next) => {
  const { jobId } = req.params;

  Job.findByIdAndDelete(jobId)
    .then(() => res.redirect("/jobs"))
    .catch((error) => next(error));
});

module.exports = router;
