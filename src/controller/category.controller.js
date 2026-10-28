import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model";

export const categorycreate = async (req, res) => {
  try {
    const { data } = matchedData;
    const newCategory = await CategoryModel.create(data);

    return res
      .status(201)
      .json({ msg: "etiqueta creada exitosamente", data: newCategory });
  } catch (error) {
    return res.status(500).json({ msg: "error en el servidor" });
  }
};

export const getallCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find({ deletedAt: null });
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ msg: "error al traer todos las categorias" });
  }
};

export const getbyIdCategory = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const category = await CategoryModel.findOne({ _id: id, deletedAt: null });

    if (!category) {
      return res.status(404).json({ msg: "no se encontro la categoria" });
    }

    res.status(200).json({ data: category });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error en el servidor, no se pudo editar la categoria" });
  }
};

export const updatecategory = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req);

    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      data,
      { new: true },
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .json({ msg: "Categoría no encontrada o inactiva" });
    }

    return res.status(200).json({
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deletecategory = async (req, res) => {
  try {
    const { id } = req.matchedData;

    const deletedCategory = await CategoryModel.findOneAndUpdate(
      { _id: id, deleteAt: null },
      { deletedAt: new Date() },
      { new: true },
    );
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ msg: "Categoría no encontrada o ya eliminada" });
    }
    return res.status(200).json({
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
