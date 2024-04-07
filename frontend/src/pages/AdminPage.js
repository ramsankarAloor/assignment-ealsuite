import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import styles from "./AdminPage.module.css";
import Customer from "../components/Customer";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import Invoice from "../components/Invoice";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { customersActions } from "../store/customers";
import { invoicesActions } from "../store/invoices";

const baseurl = BASE_URL;
const listUrl = `${baseurl}/admin/list`;

function AdminPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getList() {
      try {
        const response = await axios.get(listUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        dispatch(customersActions.setCustomers(response.data.customers))
        dispatch(invoicesActions.setInvoices(response.data.invoices))
      } catch (error) {
        console.error(error);
      }
    }
    getList();
  }, []);

  function logoutHandler() {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    history.replace("/login");
  }

  return (
    <div className={styles["full-size"]}>
      <div className={styles["left-part"]}>
        <div>
          <div className={styles["sections"]}>
            <NavLink
              to={`${match.path}/customer`}
              className={styles["for-nav-link"]}
              activeClassName={styles.selected}
            >
              Customer
            </NavLink>
          </div>
          <div className={styles["sections"]}>
            <NavLink
              to={`${match.path}/invoice`}
              className={styles["for-nav-link"]}
              activeClassName={styles.selected}
            >
              Invoice
            </NavLink>
          </div>
        </div>
        <div className={styles.sections}>
          <button className="btn btn-outline-secondary" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles["right-part"]}>
        <Switch>
          <Route exact path={`${match.path}/`}>
            <Redirect to={`${match.path}/customer`} />
          </Route>
          <Route path={`${match.path}/customer`}>
            <Customer />
          </Route>
          <Route path={`${match.path}/invoice`}>
            <Invoice />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default AdminPage;
