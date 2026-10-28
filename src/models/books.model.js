import { Schema, Types, model } from "mongoose";

const BookSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: [
      {
        type: Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
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

export const BookModel = model("Books", BookSchema);
