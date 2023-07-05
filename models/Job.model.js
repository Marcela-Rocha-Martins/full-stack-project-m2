const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    employerLogo: {
      type: String
    },
    jobApplicationLink: {
      type: String,
      required: false
    },
    jobFiles: String,
    jobApplicationDescription: {
      type: String,
      required: true
    },
    jobCountry: {
      type: String,
      required: true
    },
    dateApplied: {
      type: String
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
