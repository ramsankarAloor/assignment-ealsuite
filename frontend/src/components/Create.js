import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./Create.module.css";
import categories from "../categories";
import { BASE_URL } from "../config";
import axios from "axios";

const baseurl = BASE_URL;
const createUrl = `${baseurl}/admin/create`;

function Create(props) {
  const cat = props.category;
  const category = categories.find((category) => category.route === cat);
  const fields = category.fields;

  const [fieldInputs, setFieldInputs] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchOptions = async () => {
      const inputs = await Promise.all(
        fields.map(async (field, index) => {
          if (field.drop) {
            const options = await field.options();
            return (
              <select
                key={index}
                className="form-select mb-3"
                id={field.name}
                onChange={(e) =>
                  setFormData((prevFormData) => {
                    return {
                      ...prevFormData,
                      [field.name]: e.target.value,
                    };
                  })
                }
              >
                {options.map((opt, index) => (
                  <option value={opt} key={index}>
                    {opt}
                  </option>
                ))}
              </select>
            );
          } else {
            return (
              <div className="form-floating mb-3" key={index}>
                <input
                  className="form-control"
                  type={field.type}
                  required
                  placeholder={field.name}
                  id={field.name}
                  onChange={(e) =>
                    setFormData((prevFormData) => {
                      return {
                        ...prevFormData,
                        [field.name]: e.target.value,
                      };
                    })
                  }
                />
                <label htmlFor={field.name}>{field.name}</label>
              </div>
            );
          }
        })
      );
      setFieldInputs(inputs);
    };
    fetchOptions();
  }, [fields]);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${createUrl}/?category=${cat}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className={styles["for-card"]}>
      <h3>New {category.route}</h3>
      <form onSubmit={handleSubmit}>
        {fieldInputs}
        <Button className={styles["s-button"]} type="submit">
          Create new {category.route}
        </Button>
      </form>
    </Card>
  );
}

export default Create;
