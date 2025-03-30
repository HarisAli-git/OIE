const sequelize = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");

const User = require("./user")(sequelize, DataTypes);
const Origin = require("./origin")(sequelize, DataTypes);
const Product = require("./product")(sequelize, DataTypes);
const Customer = require("./customer")(sequelize, DataTypes);
const Supplier = require("./supplier")(sequelize, DataTypes);
const Category = require("./category")(sequelize, DataTypes);
const SupplierProduct = require("./supplierProduct")(sequelize, DataTypes);

// Relationships
Supplier.belongsTo(Origin, { foreignKey: "o_id" });
User.belongsTo(Customer, { foreignKey: "customer_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });
Supplier.belongsToMany(Product, { through: SupplierProduct });
Product.belongsToMany(Supplier, { through: SupplierProduct });

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced!"))
  .catch((err) => console.error("Sync error:", err));

module.exports = {
  User,
  Origin,
  Product,
  Supplier,
  Customer,
  sequelize,
  Category,
  SupplierProduct,
};
