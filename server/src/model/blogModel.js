const mongoose = require("mongoose");

const blogsSchemaModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    conclusion: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const blogsSchema = mongoose.model("blog", blogsSchemaModel);
module.exports = blogsSchema;
