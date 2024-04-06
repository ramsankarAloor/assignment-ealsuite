const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Invoice = sequelize.define("invoice", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  amount: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
});

module.exports = Invoice;
