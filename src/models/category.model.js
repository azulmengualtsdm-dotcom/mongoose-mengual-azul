import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    categoryname: {
      type: String,
      required: true,
      unique: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
export const CategoryModel = model("Category", CategorySchema);
