const { Product } = require("../models");

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default: page 1
    const limit = parseInt(req.query.limit) || 10; // default: 10 items per page
    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({
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
