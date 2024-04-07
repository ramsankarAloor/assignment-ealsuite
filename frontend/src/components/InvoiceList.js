import styles from "./List.module.css";
import { useSelector } from "react-redux";

function InvoiceList() {
  const invoices = useSelector((state) => state.invoices.invoices);
  const list = invoices.map((invoice, index) => {
    return (
      <div key={index} className={styles["table-row"]}>
        <div>{index + 1}</div>
        <div className={styles["row-element"]}>{invoice.customer.name}</div>
        <div className={styles["row-element"]}>{invoice.date}</div>
        <div className={styles["row-element"]}>{invoice.amount}</div>
        <div className={styles["row-element"]}>{invoice.status}</div>
      </div>
    );
  });

  return (
    <div className={styles.full}>
      <div className={styles["table-wrapper"]}>
        <div className={styles["table-row"]}>
          <div>
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
        </div>
        {list}
      </div>
    </div>
  );
}

export default InvoiceList;
