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

function AdminPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();

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
