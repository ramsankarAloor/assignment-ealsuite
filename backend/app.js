const express = require("express");
const app = express();
const server = require("http").createServer(app);
require('dotenv').config()
const sequelize = require("./utils/database")
const cors = require('cors')

app.use(cors())
app.use(express.json())

const loginRoute = require('./routes/login')
const adminRoutes = require('./routes/admin');
const Customer = require("./models/customer");
const Invoice = require("./models/invoice");

app.use("/login", loginRoute)
app.use("/admin", adminRoutes)

Customer.hasMany(Invoice, { foreignKey: 'customerId' });
Invoice.belongsTo(Customer, { foreignKey: 'customerId' });

sequelize
  .sync()
  .then(() =>
    server.listen(4000, () => console.log("server running at port 4000"))
  )
  .catch((err) => console.error(err));
