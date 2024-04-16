import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import styles from "./List.module.css";

const baseurl = BASE_URL;
const listUrl = `${baseurl}/admin/list`;

function List(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getList() {
      try {
        const response = await axios.get(
          `${listUrl}/?category=${props.category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getList();
  }, []);
  
  const headings = list.length > 0 && Object.keys(list[0]).filter((key) => key !== "id");
  const listElements = list.map((element, index) => {
    return (
      <div key={index} className={styles["table-row"]}>
        <div className={styles["number-element"]}>{index + 1}</div>
        {headings.map((heading, index) => {
          return <div key={index} className={styles["row-element"]}>{element[heading]}</div>
        })}
      </div>
    );
  });
  

  return (
    <div className={styles.full}>
      <div className={styles["table-wrapper"]}>
        <div className={styles["table-row"]}>
          <div className={styles["number-element"]}>
            <strong>#</strong>
          </div>
          {headings.length>0 && headings.map((key, index) => {
                return (
                  <div className={styles["row-element"]} key={index}>
                    <strong>{key}</strong>
                  </div>
                );
              })}
        </div>
        {listElements}
      </div>
    </div>
  );
}

export default List;
