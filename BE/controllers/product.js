const { Product } = require("../models");
const { Op } = require("sequelize");

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default: page 1
    const limit = parseInt(req.query.limit) || 10; // default: 10 items per page

    const { pct_code, description } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (pct_code) {
      whereClause.pct_code = { [Op.like]: `%${pct_code}%` };
    }
    if (description) {
      whereClause.description = { [Op.like]: `%${description}%` };
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where: whereClause,
      offset,
      limit,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
