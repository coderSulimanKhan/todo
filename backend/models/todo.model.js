import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default model("Todo", todoSchema);