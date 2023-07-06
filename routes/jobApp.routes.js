const { Router } = require("express");
const Job = require("../models/Job.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guards");
const router = new Router();

router.get("/jobs/create", isLoggedIn, (req, res) => {
  res.render("job-application");
});

router.post(
  "/jobs/create",
  fileUploader.single("jobFiles"),
  (req, res, next) => {
    const {
      creator,
      status,
      companyName,
      jobTitle,
      jobApplicationDescription,
      jobCountry,
      jobCity,
      dateApplied
    } = req.body;
    console.log("body", req.body);
    const files = req.file;
    console.log("FILES:", files);
    Job.create({
      status,
      companyName,
      jobTitle,
      jobFiles: files.path,
      jobApplicationDescription,
      jobCountry,
      jobCity,
      dateApplied
    })
      .then((newJob) => {
        // console.log("Creator:", creator, "job", newJob);
        return User.findByIdAndUpdate(creator, {
          $push: { appliedJobs: newJob._id }
        });
      })
      .then(() => res.redirect("/profile-page"))
      .catch((err) => {
        console.log(`Error while creating the job in the DB: ${err}`);
        next(err);
      });
  }
);
// router.get("/jobs", (req, res, next) => {
//   Job.find()
//     .then((dbJobs) => {
//       console.log(`Jobs from the database: `, dbJobs);
//       res.render("job-view", { jobs: dbJobs });
//     })
//     .catch((err) => {
//       console.log(`Error while getting the jobs from the DB`);
//       next(err);
//     });
// });

router.post("/jobs/:jobId/delete", (req, res, next) => {
  const { jobId } = req.params;
  Job.findByIdAndDelete(jobId)
    .then(() => res.redirect("/profile-page"))
    .catch((error) => next(error));
});

module.exports = router;

// const express = require("express");
// const router = express.Router();

// // Route to display the edit form
// router.get("/job-application/edit/:id", (req, res) => {
//   const jobId = req.params.id;



