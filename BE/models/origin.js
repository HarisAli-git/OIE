module.exports = (sequelize, DataTypes) => {
  const Origin = sequelize.define("Origin", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    country: { type: DataTypes.STRING, allowNull: false },
  });
  return Origin;
};
