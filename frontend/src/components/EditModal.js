import { Modal, Button } from "react-bootstrap";
import categories from "../categories";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const baseurl = BASE_URL;
const editurl = `${baseurl}/admin/edit`;

function FieldInput({ field, formData, setFormData }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const opts = field.options && await field.options();
      setOptions(opts);
    };
    fetchOptions();
  }, [field]);

  if (field.drop) {
    return (
      <div>
        <select
          className="form-select mb-3"
          id={field.name}
          value={formData[field.name] || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              [field.name]: e.target.value,
            }))
          }
        >
          <option value="">Select an option</option>
          {options.map((opt, index) => (
            <option value={opt} key={index}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    return (
      <div className="form-floating mb-3">
        <input
          className="form-control"
          type={field.type}
          required
          placeholder={field.name}
          id={field.name}
          value={formData[field.name] || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              [field.name]: e.target.value,
            }))
          }
        />
        <label htmlFor={field.name}>{field.name}</label>
      </div>
    );
  }
}

function EditModal(props) {
  const cat = props.category;
  const category = categories.find((category) => category.route === cat);
  const fields = category.fields;

  const [fieldInputs, setFieldInputs] = useState([]);
  const [formData, setFormData] = useState(props.initialData);

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

  async function submitHandler(e) {
    e.preventDefault();
    const { id, ...reqBody } = formData;
    // console.log("id => ", id);
    // console.log("req body => ", reqBody);
    // console.log("url => ", `${editurl}/?category=${cat}&id=${id}`);
    const token = localStorage.getItem('token');
    try {
      const resp = await axios.put(`${editurl}/?category=${cat}&id=${id}`, reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <Modal show={props.modalOpen} onHide={() => props.setModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitHandler}>
          {fields.map((field, index) => (
            <FieldInput
              key={index}
              field={field}
              formData={formData}
              setFormData={setFormData}
            />
          ))}
          <Button type="submit">Edit Customer</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;
