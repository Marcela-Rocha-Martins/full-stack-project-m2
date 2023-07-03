const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    applicationJob: {
      type: Schema.Types.ObjectId,
      ref: "Job" // WE NEED TO CHANGE IF NECESSARY
    },
    CVfile: {
      type: String
    },
    customAvatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
