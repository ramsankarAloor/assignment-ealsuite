import {
    Switch,
    NavLink,
    Route,
    useRouteMatch,
    Redirect,
  } from "react-router-dom";
import styles from "./WrapperComponent.module.css";
import List from "./List";
import Create from "./Create";


function WrapperComponent(props){
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
            <div className={styles["header-element"]}>
              <NavLink
                to={`${match.path}/edit`}
                className={styles['for-navlink']}
                activeClassName={styles.selected}
              >
                Edit
              </NavLink>
            </div>
          </div>
          <div className={styles.body}>
            <Switch>
              <Route exact path={`${match.path}/`}>
                <Redirect to={`${match.path}/list`} />
              </Route>
              <Route path={`${match.path}/list`}>
                <List category={props.category}/>
              </Route>
              <Route path={`${match.path}/create`}>
                <Create category={props.category}/>
              </Route>
              <Route path={`${match.path}/edit`}>
                {/* <EditCustomer /> */}
              </Route>
            </Switch>
          </div>
        </>
      );

}

export default WrapperComponent;