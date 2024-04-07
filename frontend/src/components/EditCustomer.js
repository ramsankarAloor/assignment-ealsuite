import { useEffect, useState } from "react";
import styles from "./List.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config";
import { customersActions } from "../store/customers";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const baseurl = BASE_URL;
const listUrl = `${baseurl}/admin/list`;

function EditCustomer() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getList() {
      try {
        const response = await axios.get(listUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(customersActions.setCustomers(response.data.customers));
      } catch (error) {
        console.error(error);
      }
    }
    getList();
  }, []);

  const customers = useSelector((state) => state.customers.customers);
  const list = customers.map((customer, index) => {
    function editOpen() {
      setId(customer.id);
      setName(customer.name);
      setPhone(customer.phone);
      setEmail(customer.email);
      setAddress(customer.address);
      setModalOpen(true);
    }
    return (
      <div key={index} className={styles["table-row"]}>
        <div className={styles["number-element"]}>{index + 1}</div>
        <div className={styles["row-element"]}>{customer.name}</div>
        <div className={styles["row-element"]}>{customer.phone}</div>
        <div className={styles["row-element"]}>{customer.email}</div>
        <div className={styles["row-element"]}>{customer.address}</div>
        <div className={styles["row-element"]}>
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={editOpen}
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
          <div className={styles["row-element"]}>
            <strong>Name</strong>
          </div>
          <div className={styles["row-element"]}>
            <strong>Phone</strong>
          </div>
          <div className={styles["row-element"]}>
            <strong>Email</strong>
          </div>
          <div className={styles["row-element"]}>
            <strong>Address</strong>
          </div>
          <div className={styles["row-element"]}></div>
        </div>
        {list}
      </div>

      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="text"
                required
                placeholder="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="text"
                pattern="[0-9]{10}"
                placeholder="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
              <label htmlFor="phone">Phone</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
              <label htmlFor="address">Address</label>
            </div>
            <Button type="submit">
              Edit Customer
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditCustomer;
