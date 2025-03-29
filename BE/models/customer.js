module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
    docs_url: { type: DataTypes.STRING },
  });
  return Customer;
};
