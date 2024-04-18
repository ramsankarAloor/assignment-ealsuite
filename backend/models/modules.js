const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

exports.getCategories = async (req, res) => {
  const { categories } = req.body;
  try {
    const models = {};

    categories.forEach((cat) => {
      const fields = {};
      cat.fields.forEach((field) => {
        fields[field.name] = {
          type: DataTypes[field.typeModel],
        };
      });

      models[cat.route] = sequelize.define(cat.route, fields, {
        timestamps: false,
      });
    });

    await sequelize.sync();

    res.status(200).json(models);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error in categories." });
  }
};


