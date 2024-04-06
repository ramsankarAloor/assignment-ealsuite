const Customer = require("../models/customer");

exports.create = async (req, res) => {
  try {
    const { category } = req.body;
    if (category === "customer") {
      const { name, phone, email, address } = req.body;
      if (!name) {
        return res
          .status(400)
          .json({ error: "name is mandatory" });
      }
      await Customer.create({ name, email, phone, address });
      return res.status(201).json({ message: "created new customer" });
    } else if (category === "invoice") {
    } else {
      return res.status(400).error({ error: "invalid category" });
    }
  } catch (error) {
    return res.status(500).json({ error: "server side error in create." });
  }
};
