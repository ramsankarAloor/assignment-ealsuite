import { Button, Card } from "react-bootstrap";
import styles from "./Create.module.css";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config";
import { invoicesActions } from "../store/invoices";

const baseurl = BASE_URL;
const createUrl = `${baseurl}/admin/create`;

function CreateInvoice() {
  const customerRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const statusRef = useRef();
  const customerOptions = useSelector((state) => state.customers.customers);
  const dispatch = useDispatch()
  const [validCustomer, setValidCustomer] = useState(true);

  function customerValidation(ref) {
    if (ref.current.value === "") {
      setValidCustomer(false);
      return false;
    } else {
      setValidCustomer(true);
      return true;
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (!customerValidation(customerRef)) {
      return;
    }
    const customer = customerRef.current.value;
    const date = dateRef.current.value;
    const amount = amountRef.current.value;
    const status = statusRef.current.value;

    const reqBody = { customer, date, amount, status, category: "invoice" };
    const token = localStorage.getItem("token");
    try {
      await axios.post(createUrl, reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(invoicesActions.onCreate({customer: {name : customer}, date, amount, status}))
    } catch (error) {
      console.error(error);
    }

    customerRef.current.value = "";
    dateRef.current.value = "";
    amountRef.current.value = "";
    statusRef.current.value = "Unpaid";
  }

  return (
    <Card className={styles["for-card"]}>
      <h3>New Invoice</h3>
      <form onSubmit={submitHandler}>
        <div className="form-floating mb-3">
          <select className="form-select" id="customer" ref={customerRef}>
            <option value="">---Select Customer---</option>
            {customerOptions.map((cust, index) => {
              return (
                <option key={index} value={cust.name}>
                  {cust.name}
                </option>
              );
            })}
          </select>
          {!validCustomer && (
            <span className={styles.error}>* Please select a customer!</span>
          )}
          <label htmlFor="customer">Customer</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="date"
            placeholder="date"
            id="date"
            ref={dateRef}
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
            ref={amountRef}
          ></input>
          <label htmlFor="amount">Amount</label>
        </div>
        <div className="form-floating mb-3">
          <select className="form-select" id="status" ref={statusRef}>
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <label htmlFor="status">Status</label>
        </div>
        <div>
          <Button className={styles["s-button"]} type="submit">
            Create new invoice
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default CreateInvoice;
