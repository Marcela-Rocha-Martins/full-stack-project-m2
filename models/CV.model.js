const { Schema, model } = require("mongoose");

const cvSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const CV = model("CV", cvSchema);

module.exports = CV;
