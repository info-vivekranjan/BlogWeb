const mongoose = require("mongoose");

const todosSchemaModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
    created_at: { type: Date, required: false, default: new Date() },
  },
  { timestamps: true, versionKey: false }
);

const todosSchema = mongoose.model("todo", todosSchemaModel);
module.exports = todosSchema;
