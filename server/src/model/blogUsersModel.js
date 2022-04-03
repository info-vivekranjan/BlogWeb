const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "basic",
      enum: ["basic", "admin"],
    },
    token: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
