require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");

// Import Routes
const userRoutes = require("./routes/user");
const originRoutes = require("./routes/origin");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const supplierRoutes = require("./routes/supplier");
const categoryRoutes = require("./routes/category");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/user", userRoutes);
app.use("/origin", originRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);
app.use("/supplier", supplierRoutes);
app.use("/category", categoryRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
