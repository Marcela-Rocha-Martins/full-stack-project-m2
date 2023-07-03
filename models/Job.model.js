const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    employerName: {
      type: String,
      required: true
    },
    employerLogo: {
      type: String
    },
    jobApplicationLink: {
      type: String,
      required: false
    },
    jobCV: {
        type: String,
        required: false
      },
    coverLetter: {
        type: String,
        required: false
      },
    jobApplicationDescription: {
      type: String,
      required: true
    },
    jobCountry: {
      type: String,
      required: true
    },
    jobCity: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const Job = model("Job", jobSchema);

module.exports = Job;
