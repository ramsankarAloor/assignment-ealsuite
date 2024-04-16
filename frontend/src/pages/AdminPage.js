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
import categories from "../categories";

const baseurl = BASE_URL;
const listUrl = `${baseurl}/admin/list`;

function AdminPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const navlinks = categories.map((cat, index) => {
    return (
      <div className={styles["sections"]}>
        <NavLink
          key={index}
          to={`${match.path}/${cat.route}`}
          className={styles["for-nav-link"]}
          activeClassName={styles.selected}
        >
          {cat.name}
        </NavLink>
      </div>
    );
  });

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
        dispatch(invoicesActions.setInvoices(response.data.invoices));
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
          {navlinks}
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
