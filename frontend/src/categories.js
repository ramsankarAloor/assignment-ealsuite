import axios from "axios";
import { BASE_URL } from "./config";

const baseurl = BASE_URL;
const getUrl = `${baseurl}/admin/list`;

async function getOptions(category) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${getUrl}/?category=${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const arr = response.data.map((ele)=> {
      return ele.name;
    })
   
    return arr;
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
      { name: "name", type: "text", pattern: ".*" },
      { name: "phone", type: "text", pattern: "[0-9]{10}" },
      { name: "email", type: "email" },
      { name: "address", type: "text", pattern: ".*" },
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
      },
      { name: "date", type: "date" },
      { name: "amount", type: "text", pattern: "[0-9]*[.]?[0-9]{0,2}" },
      {
        name: "status",
        drop: true,
        options: async () => {
          return ["unpaid", "paid", "cancelled"];
        },
      },
    ],
  },
];

export default categories;
