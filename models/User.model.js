const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required!"],
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, "name is required!"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "lastname is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      match: [/^\S+@\S+\.\S+$/, "Provide a valid email address please!"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    appliedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    passwordHash: {
      type: String,
      required: true,
    },
    CVfile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const User = model("User", userSchema);
module.exports = User;