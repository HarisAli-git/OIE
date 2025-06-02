module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    pct_code: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    description: { type: DataTypes.TEXT, allowNull: false },
    category_id: {
      type: DataTypes.INTEGER,
      references: { model: "category", key: "id" },
    },
    cd_percentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  });
  return Product;
};
