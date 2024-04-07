import styles from "./List.module.css";
import { useSelector } from "react-redux";

function CustomerList() {
  const customers = useSelector((state) => state.customers.customers);
  const list = customers.map((customer, index) => {
    return (
      <div key={index} className={styles["table-row"]}>
        <div>{index + 1}</div>
        <div className={styles["row-element"]}>{customer.name}</div>
        <div className={styles["row-element"]}>{customer.phone}</div>
        <div className={styles["row-element"]}>{customer.email}</div>
        <div className={styles["row-element"]}>{customer.address}</div>
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
        </div>
        {list}
      </div>
    </div>
  );
}

export default CustomerList;
