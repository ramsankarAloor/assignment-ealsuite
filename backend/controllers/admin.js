const customer = require("../models/customer");
const invoice = require("../models/invoice");
const sequelize = require("../utils/database");

exports.create = async (req, res) => {
  const category = req.query.category;
  try {
    await sequelize.models[category].create(req.body);
    return res.status(201).json({ message: "success." });
  } catch (error) {
    return res.status(500).json({ error: "server side error in create." });
  }
};

exports.list = async (req, res) => {
  const category = req.query.category;
  try {
    const resultList = await sequelize.models[category].findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(resultList);
  } catch (error) {
    return res.status(500).json({ error: "server side error in list." });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id, category } = req.query;
    await sequelize.models[category].update(req.body, { where: { id: id } });
    return res.status(200).json({ message: "update successful" });
  } catch (error) {
    return res.status(500).json({ error: "server side error in edit." });
  }
  try {
    const { category } = req.body;
    if (category === "invoice") {
      const { id: invoiceId } = req.params;
      const { customerName, date, amount, status } = req.body;
      const { dataValues: cust } = await customer.findOne({
        attributes: ["id"],
        where: { name: customerName },
      });
      if (!cust) {
        return res.status(400).json({ error: "invalid customer" });
      }
      await invoice.update(
        { date, amount, status, customerId: cust.id },
        { where: { id: invoiceId } }
      );
      return res.status(200).json({ message: "invoice update successful." });
    } else if (category === "customer") {
      const { id: customerId } = req.params;
      const { name, phone, email, address } = req.body;

      if (name.trim() === "") {
        return res.status(400).json({ error: "name is mandatory" });
      }
      await customer.update(
        { name, phone, email, address },
        { where: { id: customerId } }
      );
      return res.status(200).json({ message: "customer update successful." });
    } else {
      return res.status(400).json({ error: "invalid category" });
    }
  } catch (error) {
    return res.status(500).json({ error: "server side error in edit." });
  }
};
