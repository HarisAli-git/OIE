module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define("Category", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    description: { type: DataTypes.TEXT, allowNull: false },
  });
  return category;
};
