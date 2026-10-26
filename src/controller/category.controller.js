import { CategoryModel } from "../models/category.model";

export const categorycreate = async (req, res) => {
  try {
    const { categoryname } = req.body;
    const newCategory = await CategoryModel.create({
      categoryname,
    });

    return res
      .status(201)
      .json({ msg: "etiqueta creada exitosamente", data: newCategory });
  } catch (error) {
    return res.status(500).json({ msg: "error en el servidor" });
  }
};

export const getallCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ msg: "error al traer todos las categorias" });
  }
};

export const updatecategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryname } = req.body;

    const updatedCategory = await CategoryModel.updateOne(
      { _id: id },
      { categoryname },
    );

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
    const { id } = req.params;

    const deletedCategory = await CategoryModel.deleteOne({ _id: id });

    return res.status(200).json({
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
