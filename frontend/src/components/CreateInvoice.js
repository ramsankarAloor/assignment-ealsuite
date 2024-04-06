import { Button, Card } from "react-bootstrap";
import styles from "./Create.module.css";
import { useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const baseurl = BASE_URL;
const createUrl = `${baseurl}/admin/create`;

function CreateInvoice() {
  const customerRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const statusRef = useRef();
  const customerOptions = ["Ramsankar", "Rajat"]; //dummy for now

  function customerValidation(customerRef) {
    if (!customerOptions.includes(customerRef.current.value)) {
      customerRef.current.setCustomValidity("Please select a valid option");
    } else {
      customerRef.current.setCustomValidity("");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    customerValidation(customerRef);
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className={styles["for-card"]}>
      <h3>New Invoice</h3>
      <form onSubmit={submitHandler}>
        <div className="form-floating mb-3">
          <input
            list="customerOptions"
            className="form-control"
            id="customer"
            placeholder="customer"
            ref={customerRef}
          />
          <label htmlFor="customer">Customer name</label>
          <datalist id="customerOptions">
            {customerOptions.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
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
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
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
