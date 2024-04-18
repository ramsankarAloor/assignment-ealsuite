import { Modal, Button } from "react-bootstrap";
import categories from "../categories";
import { useEffect, useState } from "react";
import axios from 'axios';

function EditModal(props) {
  const cat = props.category;
  const category = categories.find((category) => category.route === cat);
  const fields = category.fields;

  const [fieldInputs, setFieldInputs] = useState([]);
  const [formData, setFormData] = useState(props.initialData);

  console.log("id => ", formData.id);
  // now value is there in the formData. Now, need to populate the fields with it.

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
                value={formData[field.name]}
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
                  value={formData[field.name]}
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

  function submitHandler(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      axios.put()
    } catch (error) {
      
    }
  }

  return (
    <Modal show={props.modalOpen} onHide={() => props.setModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitHandler}>
          {fieldInputs}
          <Button type="submit">Edit Customer</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;
