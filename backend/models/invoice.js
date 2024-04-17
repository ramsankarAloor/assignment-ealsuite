const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const invoice = sequelize.define("invoice", {
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
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
  },
  customer: {
    type : DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = invoice;
