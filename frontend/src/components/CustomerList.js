import { useEffect } from "react";
import styles from "./List.module.css";
import axios from "axios";
import { BASE_URL } from "../config";

const baseurl = BASE_URL;
const listUrl = `${baseurl}/admin/list`;

function CustomerList() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getCustomers() {
      try {
        const response = await axios.get(listUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getCustomers();
  }, []);

  return (
    <div className={styles["table-wrapper"]}>
      <h4>List</h4>
    </div>
  );
}

export default CustomerList;
