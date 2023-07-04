const { Schema, model } = require("mongoose");

const coverLetterSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: Schema.ObjectId,
      ref: "User"
    },
    fileUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const CoverLetter = model("CoverLetter", coverLetterSchema);

module.exports = CoverLetter;
