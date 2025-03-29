// controllers/categories.controller.js
const { Categories } = require("../models");

exports.getAllCategories = async (req, res) => {
  const categories = await Categories.findAll();
  res.json(categories);
};
