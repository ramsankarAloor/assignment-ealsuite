import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./Create.module.css";
import categories from "../categories";

function Create(props) {
  const cat = props.category;
  const category = categories.find((category) => category.route === cat);
  const fields = category.fields;

  const [fieldInputs, setFieldInputs] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const inputs = await Promise.all(
        fields.map(async (field, index) => {
          if (field.drop) {
            const options = await field.options();
            return (
              <select key={index} className="form-select mb-3" id={field.name}>
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

  return (
    <Card className={styles["for-card"]}>
      <h3>New {category.route}</h3>
      <form>
        {fieldInputs}
        <Button className={styles["s-button"]} type="submit">
          Create new {category.route}
        </Button>
      </form>
    </Card>
  );
}

export default Create;
