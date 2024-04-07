const Customer = require("../models/customer");
const Invoice = require("../models/invoice");

exports.create = async (req, res) => {
  try {
    const { category } = req.body;
    if (category === "customer") {
      const { name, phone, email, address } = req.body;
      if (!name) {
        return res.status(400).json({ error: "name is mandatory" });
      }
      await Customer.create({ name, email, phone, address });
      return res.status(201).json({ message: "created new customer" });
    } else if (category === "invoice") {
      const { customer, date, amount, status } = req.body;
      const { dataValues: cust } = await Customer.findOne({
        attributes: ["id"],
        where: { name: customer },
      });
      if (!cust) {
        return res.status(400).json({ error: "invalid customer" });
      }

      await Invoice.create({ date, amount, status, customerId: cust.id });
      res.status(200).json({ message: "invoice created" });
    } else {
      return res.status(400).json({ error: "invalid category" });
    }
  } catch (error) {
    return res.status(500).json({ error: "server side error in create." });
  }
};

exports.list = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: ["id", "name", "phone", "email", "address"],
      order: [["id", "ASC"]],
    });
    const invoices = await Invoice.findAll({
      include: [{ model: Customer, attributes: ["name"] }],
      attributes: ["id", "date", "amount", "status"],
      order: [["id", "ASC"]],
    });
    return res.status(200).json({ customers, invoices });
  } catch (error) {
    return res.status(500).json({ error: "server side error in list" });
  }
};

exports.edit = async (req, res) => {
  try {
    const { category } = req.body;
    if (category === "invoice") {
      const { id: invoiceId } = req.params;
      const { customerName, date, amount, status } = req.body;
      const { dataValues: cust } = await Customer.findOne({
        attributes: ["id"],
        where: { name: customerName },
      });
      await Invoice.update(
        { date, amount, status, customerId: cust.id },
        { where: { id: invoiceId } }
      );
      return res.status(200).json({ message: "update successful." });
    } else if (category === "customer") {
    } else {
      return res.status(400).json({ error: "invalid category" });
    }
  } catch (error) {
    return res.status(500).json({ error: "server side error in edit." });
  }
};
