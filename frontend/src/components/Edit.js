import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../config";
import styles from "./List.module.css";
import EditModal from "./EditModal";

const baseurl = BASE_URL;
const listUrl = `${baseurl}/admin/list`;

function Edit(props) {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const headings =
    list.length > 0 && Object.keys(list[0]).filter((key) => key !== "id");

  const listElements = list.map((element, index) => {
    return (
      <div key={index} className={styles["table-row"]}>
        <div className={styles["number-element"]}>{index + 1}</div>
        {headings.map((heading, index) => {
          return (
            <div key={index} className={styles["row-element"]}>
              {element[heading]}
            </div>
          );
        })}
        <div className={styles["row-element"]}>
          <button
            onClick={() => {
              setSelectedItem(element); // Update selectedItem here
              setModalOpen(true);
            }}
          >
            Edit
          </button>
        </div>
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
          {headings.length > 0 &&
            headings.map((key, index) => {
              return (
                <div className={styles["row-element"]} key={index}>
                  <strong>{key}</strong>
                </div>
              );
            })}
          <div className={styles["row-element"]}></div>
        </div>
        {listElements}
      </div>

      {selectedItem && (
        <EditModal
          key={selectedItem.id} // Use a unique key for the selected item
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          category={props.category}
          initialData={selectedItem}
        />
      )}
    </div>
  );
}

export default Edit;
