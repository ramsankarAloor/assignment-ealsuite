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
};
