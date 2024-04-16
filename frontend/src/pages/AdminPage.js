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
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { customersActions } from "../store/customers";
import { invoicesActions } from "../store/invoices";
import categories from "../categories";
import WrapperComponent from "../components/WrapperComponent";

function AdminPage() {
  const [category, setCategory] = useState(categories[0].route)
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const navlinks = categories.map((cat, index) => {
    return (
      <div className={styles["sections"]} key={index}>
        <NavLink
          to={`${match.path}/${cat.route}`}
          className={styles["for-nav-link"]}
          activeClassName={styles.selected}
          onClick={()=>setCategory(cat.route)}
        >
          {cat.name}
        </NavLink>
      </div>
    );
  });


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
            <Redirect to={`${match.path}/${category}`} />
          </Route>
          <Route path={`${match.path}/${category}`}>
            <WrapperComponent category={category}/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default AdminPage;
