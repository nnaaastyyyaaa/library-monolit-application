const categoryService = require("../service/categoryService");

exports.getAllCategories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const categories = await categoryService.getAllCategories(page, limit);
    res.json(categories);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ "Created category": category });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryService.getCategory(id);
    res.json(category);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCategory = await categoryService.updateCategory(id, req.body);
    res.json({ "Updated category": updatedCategory });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await categoryService.deleteCategory(id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
