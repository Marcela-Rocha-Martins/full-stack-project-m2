const express = require("express");
const router = express.Router();
const Job = require("../models/Job.model");

router.get("/job/details", (req, res) => {
  const {
    companyName,
    jobTitle,
    dateApplied,
    jobCountry,
    jobCity,
    status,
    jobApplicationLink,
    jobFiles,
    jobApplicationDescription,
  } = req.query;

  res.render("job-view", {
    companyName,
    jobTitle,
    dateApplied,
    jobCountry,
    jobCity,
    status,
    jobApplicationLink,
    jobFiles,
    jobApplicationDescription,
  });
});

router.get("/job/details/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const job = await Job.findById(_id);

    if (job) {
      res.render("job-view", {
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        dateApplied: job.dateApplied,
        jobCountry: job.jobCountry,
        jobCity: job.jobCity,
        status: job.status,
        jobApplicationLink: job.jobApplicationLink,
        jobFiles: job.jobFiles,
        jobApplicationDescription: job.jobApplicationDescription,
      });
    } else {
      res.status(404).send("Job not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
