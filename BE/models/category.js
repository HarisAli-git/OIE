module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "Category",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      description: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      tableName: "category", // ✅ Exact table name
      freezeTableName: true, // ✅ Prevents pluralization
      timestamps: false, // ✅ Prevents Sequelize from expecting createdAt/updatedAt
    }
  );

  category.associate = (models) => {
    category.hasMany(models.Product, {
      foreignKey: "category_id",
      as: "products",
    });
  };

  return category;
};
