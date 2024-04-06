import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./AuthPage.module.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../config";
import { authActions } from "../store/auth";

const baseurl = BASE_URL;
const loginUrl = `${baseurl}/login`;

function AuthPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [wrongPass, setWrongpass] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();

  async function loginHandler() {
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (email.trim() === "" || password.trim() === "") {
      alert("Fill up all the fields!!");
      return;
    }

    const reqBody = { email, password };
    try {
      const response = await axios.post(loginUrl, reqBody);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login({ token: response.data.token }));
      history.replace("/admin");
    } catch (error) {
      if (error.response.status === 401) {
        setWrongpass(true);
      } else {
        alert(error.response.data.error);
        setWrongpass(false);
      }
    }
  }

  return (
    <div className={styles["for-container"]}>
      <Card className={styles["for-card"]}>
        <h3>Login</h3>
        <div className="form-floating">
          <input
            className="form-control"
            type="email"
            required
            placeholder="email"
            id="email"
            ref={emailRef}
          ></input>
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input
            className={`form-control ${wrongPass ? styles.error : ""}`}
            type="password"
            required
            placeholder="password"
            id="password"
            ref={passRef}
          ></input>
          <label htmlFor="password">Password</label>
          {wrongPass && (
            <span className={styles["error-text"]}>*Wrong password</span>
          )}
        </div>
        <Button className={styles["s-button"]} onClick={loginHandler}>
          Login
        </Button>
      </Card>
    </div>
  );
}

export default AuthPage;
