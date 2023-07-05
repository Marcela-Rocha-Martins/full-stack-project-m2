const express = require("express");
const router = express.Router();

// Route to display the edit form
router.get("/job-application/edit/:id", (req, res) => {
  const jobId = req.params.id;

  // Logic to retrieve existing information from the database or any other data source
  const jobApplication = {
    _id: jobId,
    CompanyName: "Company Name",
    JobTitle: "Job Title",
    DateApplied: "Date Applied",
    Location: "Location",
    Comments: "Comments",
    Files: "Files"
  };

  // Render the edit view, passing the existing data to the template
  res.render("edit-job-application", { jobApplication });
});

// Route to handle the submission of the edit form
router.post("/job-application/edit/:id", (req, res) => {
  const jobId = req.params.id;
  const { CompanyName, JobTitle, DateApplied, Location, Comments, Files } =
    req.body;

  // Logic to process the information submitted in the edit form
  // and update the existing information in the database or any other data source

  // Redirect the user to the job view page after editing
  res.redirect("/job-application/" + jobId);
});

// Route to handle the deletion of the job application
router.delete("/job-application/:id", (req, res) => {
  const jobId = req.params.id;

  // Redirect the user to the profile page after deletion
  res.redirect("/profile-page");
});

module.exports = router;
