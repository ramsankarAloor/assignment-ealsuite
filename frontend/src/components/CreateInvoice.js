import { Button, Card } from "react-bootstrap";
import styles from "./Create.module.css";

function CreateInvoice() {
  function submitHandler(e) {
    e.preventDefault()
  }

  return (
    <Card className={styles["for-card"]}>
      <h3>New Invoice</h3>
      <form onSubmit={submitHandler}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            required
            placeholder="customer"
            id="customer"
          ></input>
          <label htmlFor="customer">Customer</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="date"
            placeholder="date"
            id="date"
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
          ></input>
          <label htmlFor="amount">Amount</label>
        </div>
        <div className="form-floating mb-3">
          <select className="form-select" id="status">
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
