import CreateCustomer from "./CreateCustomer";
import styles from "./Customer.module.css";
import {
  Switch,
  NavLink,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import CustomerList from "./CustomerList";

function Customer() {
  const match = useRouteMatch();

  return (
    <>
      <div className={styles.header}>
        <div className={styles["header-element"]}>
          <NavLink to={`${match.path}/list`} className={styles['for-navlink']} activeClassName={styles.selected}>
            List
          </NavLink>
        </div>
        <div className={styles["header-element"]}>
          <NavLink
            to={`${match.path}/create`}
            className={styles['for-navlink']}
            activeClassName={styles.selected}
          >
            Create
          </NavLink>
        </div>
      </div>
      <div className={styles.body}>
        <Switch>
          <Route exact path={`${match.path}/`}>
            <Redirect to={`${match.path}/list`} />
          </Route>
          <Route path={`${match.path}/list`}>
            <CustomerList />
          </Route>
          <Route path={`${match.path}/create`}>
            <CreateCustomer />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Customer;
