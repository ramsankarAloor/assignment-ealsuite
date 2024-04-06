import Create from "./Create";
import styles from "./Customer.module.css";
import { Switch, NavLink, Route, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

function Customer() {
  const match = useRouteMatch();

  return (
    <>
      <div className={styles.header}>
        <div className={styles["header-element"]}>
          {/* <NavLink>List</NavLink> */}
          List
        </div>
        <div className={styles["header-element"]}>
          <NavLink to={`${match.path}/create`} activeClassName={styles.selected}>Create</NavLink>
        </div>
      </div>
      <div className={styles.body}>
        <Switch>
          <Route path={`${match.path}/list`}>
            {/* <List /> */}
          </Route>
          <Route path={`${match.path}/create`}>
            <Create />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default Customer;
