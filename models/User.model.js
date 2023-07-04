const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Username is required!"],
      unique: true

    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      match: [/^\S+@\S+\.\S+$/, "Provide a valid email address please!"],
      unique: true,
      lowercase: true,
      trim: true
    },
    avatarUrl: {
      type: String
    },
    appliedJobs: [{ type: Schema.ObjectId, ref: "Job" }],
    passwordHash: {
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
      type: String,
      required: [true, "Password is required!"]
    }
  },
  {
    timestamps: true
  }
);
const User = model("User", userSchema);

module.exports = User;
