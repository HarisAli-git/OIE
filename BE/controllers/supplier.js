// controllers/supplier.controller.js
const { Supplier } = require("../models");

exports.getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.findAll();
  res.json(suppliers);
};
