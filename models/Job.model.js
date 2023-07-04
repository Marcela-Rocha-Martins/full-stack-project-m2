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
    jobCV: {
      type: Schema.Types.ObjectId,
      ref: "CV",
      required: false
    },
    coverLetter: {
      type: Schema.Types.ObjectId,
      ref: "CoverLetter"
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
