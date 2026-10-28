import { Types, Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    configu: {
      language: {
        type: String,
        enum: {
          values: ["Español", "Ingles"],
        },
      },
      perfil: {
        type: String,
        enum: {
          values: ["privado", "publico"],
        },
      },
    },
    person: {
      type: Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model("User", UserSchema);
