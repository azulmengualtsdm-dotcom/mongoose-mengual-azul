import { PersonModel } from "../models/person.model";

export const personcreate = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const newPerson = await PersonModel.create({
      first_name,
      last_name,
    });
    return res.status(201).json({ data: newPerson });
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const getallperson = async (req, res) => {
  try {
    const people = await PersonModel.find();
    res.status(200).json({ data: people });
  } catch (error) {
    res.status(500).json({ msg: "error al traer todos las personas" });
  }
};

export const getPersonById = async (req, res) => {
  try {
    const { id } = req.params;
    const people = await PersonModel.findById(id);

    return res.status(200).json({ data: people });
  } catch (error) {
    return res.status(500).json({
      msg: "error interno del servidor",
    });
  }
};

export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;

    const updatedPerson = await PersonModel.updateOne(
      { _id: id },
      { first_name, last_name },
    );

    return res.status(200).json({
      data: updatedPerson,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPerson = await PersonModel.deleteOne({ _id: id });

    return res.status(200).json({
      data: deletedPerson,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
