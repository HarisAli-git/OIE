module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: {
      type: DataTypes.INTEGER,
      references: { model: "category", key: "id" },
    },
  });
  return Product;
};
