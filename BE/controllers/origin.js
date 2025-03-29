// controllers/origin.controller.js
const { Origin } = require("../models");

exports.getAllOrigins = async (req, res) => {
  const origins = await Origin.findAll();
  res.json(origins);
};
