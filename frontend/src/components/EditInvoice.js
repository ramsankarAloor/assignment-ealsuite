import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import styles from "./List.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { invoicesActions } from "../store/invoices";
import {Modal, Button} from 'react-bootstrap';

const baseurl = BASE_URL;
const listUrl = `${baseurl}/admin/list`;

function EditInvoice() {
    const [id, setId] = useState()
    const [customerName, setCustomerName] = useState()
    const [date, setDate] = useState()
    const [amount, setAmount] = useState()
    const [status, setStatus] = useState()
    const [modalOpen, setModalOpen] = useState()
    const [validCustomer, setValidCustomer] = useState(true);
    const customerOptions = useSelector((state) => state.customers.customers);
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem("token");
        async function getList() {
          try {
            const response = await axios.get(listUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            dispatch(invoicesActions.setInvoices(response.data.invoices));
          } catch (error) {
            console.error(error);
          }
        }
        getList();
      }, []);
    
  const invoices = useSelector((state) => state.invoices.invoices);
  const list = invoices.map((invoice, index) => {
    function editOpen(){
        setId(invoice.id)
        setCustomerName(invoice.customer.name)
        setDate(invoice.date)
        setAmount(invoice.amount)
        setStatus(invoice.status)
        setModalOpen(true)
    }
    return (
      <div key={index} className={styles["table-row"]}>
        <div className={styles["number-element"]}>{index + 1}</div>
        <div className={styles["row-element"]}>{invoice.customer.name}</div>
        <div className={styles["row-element"]}>{invoice.date}</div>
        <div className={styles["row-element"]}>{invoice.amount}</div>
        <div className={styles["row-element"]}>{invoice.status}</div>
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
            <strong>Customer</strong>
          </div>
          <div className={styles["row-element"]}>
            <strong>Date</strong>
          </div>
          <div className={styles["row-element"]}>
            <strong>Amount</strong>
          </div>
          <div className={styles["row-element"]}>
            <strong>Status</strong>
          </div>
          <div className={styles["row-element"]}>
          </div>
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
          <select className="form-select" id="customer" value={customerName} onChange={e => setCustomerName(e.target.value)}>
            {customerOptions.map((cust, index) => {
              return (
                <option key={index} value={cust.name}>
                  {cust.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="customer">Customer</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="date"
            placeholder="date"
            id="date"
            value={date} onChange={e => setDate(e.target.value)}
          ></input>
          <label htmlFor="date">Date</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            pattern="[0-9]*[.]?[0-9]{0,2}"
            placeholder="amount"
            id="amount"
            value={amount} onChange={e => setAmount(e.target.value)}
          ></input>
          <label htmlFor="amount">Amount</label>
        </div>
        <div className="form-floating mb-3">
          <select className="form-select" id="status" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <label htmlFor="status">Status</label>
        </div>
        <div>
          <Button type="submit">
            Edit invoice
          </Button>
        </div>
      </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditInvoice;
