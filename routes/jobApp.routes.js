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


// const express = require("express");
// const router = express.Router();

// // Route to display the edit form
// router.get("/job-application/edit/:id", (req, res) => {
//   const jobId = req.params.id;

//   // Logic to retrieve existing information from the database or any other data source
//   const jobApplication = {
//     _id: jobId,
//     CompanyName: "Company Name",
//     JobTitle: "Job Title",
//     DateApplied: "Date Applied",
//     Location: "Location",
//     Comments: "Comments",
//     Files: "Files"
//   };

//   // Render the edit view, passing the existing data to the template
//   res.render("edit-job-application", { jobApplication });
// });

// // Route to handle the submission of the edit form
// router.post("/job-application/edit/:id", (req, res) => {
//   const jobId = req.params.id;
//   const { CompanyName, JobTitle, DateApplied, Location, Comments, Files } =
//     req.body;

//   // Logic to process the information submitted in the edit form
//   // and update the existing information in the database or any other data source

//   // Redirect the user to the job view page after editing
//   res.redirect("/job-application/" + jobId);
// });

// // Route to handle the deletion of the job application
// router.delete("/job-application/:id", (req, res) => {
//   const jobId = req.params.id;

//   // Redirect the user to the profile page after deletion
//   res.redirect("/profile-page");
// });

// module.exports = router;
