import { Button, Card } from "react-bootstrap";
import styles from "./Create.module.css";
import { useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const baseurl = BASE_URL;
const createUrl = `${baseurl}/admin/create`;

function CreateCustomer() {
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();

  function submitHandler(e) {
    e.preventDefault()
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const address = addressRef.current.value;

    const reqBody = {
      name,
      phone,
      email,
      address,
      category: "customer",
    };

    const token = localStorage.getItem("token");
    try {
      axios.post(createUrl, reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }

    nameRef.current.value = "";
    phoneRef.current.value = "";
    emailRef.current.value = "";
    addressRef.current.value = "";
  }

  return (
    <Card className={styles["for-card"]}>
      <h3>New Customer</h3>
      <form onSubmit={submitHandler}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            required
            placeholder="name"
            id="name"
            ref={nameRef}
          ></input>
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            pattern="[0-9]{10}"
            placeholder="phone"
            id="phone"
            ref={phoneRef}
          ></input>
          <label htmlFor="phone">Phone</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="email"
            id="email"
            ref={emailRef}
          ></input>
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="address"
            id="address"
            ref={addressRef}
          ></input>
          <label htmlFor="address">Address</label>
        </div>
        <Button className={styles["s-button"]} type="submit">
          Create new customer
        </Button>
      </form>
    </Card>
  );
}

export default CreateCustomer;
