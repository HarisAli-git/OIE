module.exports = (sequelize, DataTypes) => {
  const SupplierProduct = sequelize.define("SupplierProduct", {
    supplier_id: {
      type: DataTypes.INTEGER,
      references: { model: "Suppliers", key: "id" },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: { model: "Products", key: "id" },
    },
  });
  return SupplierProduct;
};
