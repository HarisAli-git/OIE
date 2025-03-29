const sequelize = require("../config/database");
const User = require("./customer")(sequelize);
const Origin = require("./origin")(sequelize);
const Product = require("./product")(sequelize);
const Customer = require("./customer")(sequelize);
const Supplier = require("./supplier")(sequelize);
const Categories = require("./categories")(sequelize);
const SupplierProduct = require("./supplierProduct")(sequelize);

// Relationships
Supplier.belongsTo(Origin, { foreignKey: "o_id" });
User.belongsTo(Customer, { foreignKey: "customer_id" });
Product.belongsTo(Categories, { foreignKey: "category_id" });
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
  Categories,
  SupplierProduct,
};
