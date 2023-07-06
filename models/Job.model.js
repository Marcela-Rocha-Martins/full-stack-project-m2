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
    status: {
      type: String,
      // enum: ["firstContact", "scheduledInterviews", "onHold"],
      required: true
    },
    jobTitle: {
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
    jobFiles: String,
    jobApplicationDescription: {
      type: String,
      required: false
    },
    jobCountry: {
      type: String,
      required: true
    },
    dateApplied: {
      type: Date,
      allowNull: true
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
