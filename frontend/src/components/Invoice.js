import { NavLink, Redirect, Route, Switch, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import styles from './Customer.module.css'
import CreateInvoice from "./CreateInvoice";
import InvoiceList from './InvoiceList';

function Invoice() {
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
              <InvoiceList />
            </Route>
            <Route path={`${match.path}/create`}>
              <CreateInvoice />
            </Route>
          </Switch>
        </div>
      </>
    );
}

export default Invoice;
