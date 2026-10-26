import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model";

export const usercreate = async (req, res) => {
  try {
    const data = matchedData();
    const newUser = await UserModel.create(data);

    return res
      .status(201)
      .json({ msg: "usuario creado exitosamente", data: newUser });
  } catch (error) {
    return res.status(500).json({ msg: "error en el servidor" });
  }
};

export const getalluser = async (req, res) => {
  try {
    const users = await UserModel.find({ deleteat: null }).populate("Person");
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ msg: "error al traer todos los usuarios" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const user = await UserModel.findOne({ _id: id, deleteat: null }).populate(
      "Person",
    );
    if (!user) {
      return res.status(404).json({ msg: "no se encontro al usuario" });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({
      msg: "error interno del servidor",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req);

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      data,
      { new: true },
    );

    return res.status(200).json({
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const deletedUser = await UserModel.deleteOne({ _id: id });

    return res.status(200).json({
      data: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
