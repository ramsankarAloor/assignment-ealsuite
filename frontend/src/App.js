import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AuthPage from "./pages/AuthPage";
import { useSelector } from "react-redux";
import AdminPage from "./pages/AdminPage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to='/admin'/> : <Redirect to='/login'/> }
        </Route>
        <Route path="/login">
          <AuthPage />
        </Route>
        <Route path='/admin'>
          {isLoggedIn ? <AdminPage /> : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </>
  );
}

export default App;
