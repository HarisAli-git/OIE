module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define("Supplier", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    o_id: {
      type: DataTypes.INTEGER,
      references: { model: "Origins", key: "id" },
    },
  });
  return Supplier;
};
