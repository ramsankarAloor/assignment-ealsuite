import axios from "axios";
import { BASE_URL } from "./config";

const baseurl = BASE_URL;
const getUrl = `${baseurl}/admin/list`;
const caturl = `${baseurl}/admin/categories`;

async function getOptions(category) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${getUrl}/?category=${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const arr = response.data.map((ele) => {
      return ele.name;
    });
    const modified = ["<---select--->", ...arr];
    return modified;
  } catch (error) {
    console.error(error);
  }
}

const categories = [
  {
    name: "Customers",
    route: "customer",
    alt: "customers",
    fields: [
      {
        name: "name",
        type: "text",
        pattern: ".*",
        typeModel: "STRING",
      },
      {
        name: "phone",
        type: "text",
        pattern: "[0-9]{10}",
        typeModel: "STRING",
      },
      { name: "email", type: "email", typeModel: "STRING" },
      { name: "address", type: "text", pattern: ".*", typeModel: "STRING" },
    ],
  },
  {
    name: "Invoices",
    route: "invoice",
    alt: "invoices",
    fields: [
      {
        name: "customer",
        drop: true,
        options: async () => {
          return await getOptions("customer");
        },
        typeModel: "STRING",
      },
      { name: "date", type: "date", typeModel: "DATEONLY" },
      {
        name: "amount",
        type: "text",
        pattern: "[0-9]*[.]?[0-9]{0,2}",
        typeModel: "INTEGER",
      },
      {
        name: "status",
        drop: true,
        options: async () => {
          return ["<---select--->", "unpaid", "paid", "cancelled"];
        },
        typeModel: "STRING",
      },
    ],
  },
];

async function sendCategories() {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      caturl,
      { categories },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

sendCategories();

export default categories;
