const { Router } = require("express");
const Job = require("../models/Job.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guards");

const router = new Router();
router.get("/jobs/create", (req, res) => {
  res.render("job-application");
});

router.post(
  "/jobs/create",
  fileUploader.any([{ name: "jobFiles" }, { name: "jobFiles2" }]),
  (req, res, next) => {
    const {
      status,
      companyName,
      jobTitle,
      jobApplicationDescription,
      jobCountry,
      jobCity,
      dateApplied,
    } = req.body;
    // console.log("body", req.body);
    const files = req.files;
    console.log("FILES:", files);
    const jobFiles = files[0].path;
    const jobFiles2 = files[1].path;
    console.log("Current User:======> ", req.session.currentUser);
    // let creator = req.session.currentUser._id;
    Job.create({
      status,
      // creator,
      companyName,
      jobTitle,
      jobFiles: jobFiles,
      jobFiles2: jobFiles2,
      jobApplicationDescription,
      jobCountry,
      jobCity,
      dateApplied,
    })
      .then((newJob) => {
        // console.log("Creator:", creator, "job", newJob);
        return User.findByIdAndUpdate(req.session.currentUser._id, {
          $push: { appliedJobs: newJob._id },
        });
      })
      .then(() => res.redirect("/profile-page"))
      .catch((err) => {
        console.log(`Error while creating the job in the DB: ${err}`);
        next(err);
      });
  }
);

router.get("/jobs/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    let job = await Job.findById(jobId);
    // res.send(job);
    res.render("job-details", { job: job });
  } catch (error) {
    consol.log(error);
  }
});
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
// router.post("/jobs/:jobId/delete", (req, res, next) => {
//   const { jobId } = req.params;
//   Job.findByIdAndDelete(jobId)
//     .then(() => res.redirect("/profile-page"))
//     .catch((error) => next(error));
// });

module.exports = router;
