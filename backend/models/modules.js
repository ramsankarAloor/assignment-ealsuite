const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

exports.getCategories = (req, res) => {
  const { categories } = req.body;

  categories.forEach((cat) => {});
  res.status(200);
};
