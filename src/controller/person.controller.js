import { matchedData } from "express-validator";
import { PersonModel } from "../models/person.model";

export const personcreate = async (req, res) => {
  try {
    const { data } = matchedData(req);
    const newPerson = await PersonModel.create(data);
    return res.status(201).json({ data: newPerson });
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const getallperson = async (req, res) => {
  try {
    const people = await PersonModel.find({ deletedAt: null });
    res.status(200).json({ data: people });
  } catch (error) {
    res.status(500).json({ msg: "error al traer todos las personas" });
  }
};

export const getPersonById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const person = await PersonModel.findOne({ _id: id, deletedAt: null });
    if (!person) {
      return res.status(404).json({ msg: "no se encontro a la persona" });
    }
    return res.status(200).json({ data: person });
  } catch (error) {
    return res.status(500).json({
      msg: "error interno del servidor",
    });
  }
};

export const updatePerson = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req);

    const updatedPerson = await PersonModel.findOneAndUpdate(
      {
        _id: id,
        deletedAt: null,
      },
      data,
      { new: true },
    );
    if (!updatedPerson) {
      return res.status(404).json({ msg: "no se encontro a la persona" });
    }

    return res
      .status(200)
      .json({ msg: "editado exitosamente", data: updatedPerson });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deletePerson = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const deletedPerson = await PersonModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      {
        deletedAt: new Date(),
      },
      {
        new: true,
      },
    );

    if (!deletedPerson) {
      return res.status(404).json({ msg: "persona no encontrada" });
    }

    return res.status(200).json({
      data: deletedPerson,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
