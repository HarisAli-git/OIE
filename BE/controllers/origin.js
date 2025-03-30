// controllers/origin.controller.js
const { Origin } = require("../models");

exports.getAllOrigins = async (req, res) => {
  try {
    const origins = await Origin.findAll();
    res.json(origins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
