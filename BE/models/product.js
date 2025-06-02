module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
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
    },
    {
      tableName: "Product", // ✅ Exact table name
      freezeTableName: true, // ✅ Prevents pluralization
      timestamps: false, // ✅ Prevents Sequelize from expecting createdAt/updatedAt
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  };

  return Product;
};
