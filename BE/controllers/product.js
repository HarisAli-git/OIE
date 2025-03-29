// controllers/product.controller.js
const { Product } = require("../models");

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};
