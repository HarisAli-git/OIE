// controllers/category.controller.js
const { Category } = require("../models");

exports.getAllcategories = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
