import styles from "./List.module.css";
import { useSelector } from 'react-redux';

function CustomerList() {
  const customers = useSelector(state => state.customers.customers)

  return (
    <div className={styles["table-wrapper"]}>
      <h4>List</h4>
    </div>
  );
}

export default CustomerList;
