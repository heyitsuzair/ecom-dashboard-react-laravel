import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/commons/Header/Header";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { addProduct } from "../utils/apis/apis";

export default function AddProduct() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
    file: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("ecom-user")) {
      navigate("/");
      return;
    }
    //eslint-disable-next-line
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);

    await axios.post(addProduct, formData).then(({ data }) => {
      if (data) {
        setValues({
          name: "",
          price: "",
          description: "",
          file: "",
        });
        alert("Product Added!");
      } else {
        alert("Something Went Wrong!");
      }
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <Container className="mt-4">
        <Form onSubmit={(e) => handleFormSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => handleChange(e)}
              value={values.name}
              type="text"
              name="name"
              placeholder="Product Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(e) => handleChange(e)}
              value={values.description}
              type="text"
              name="description"
              placeholder="Product Description"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={(e) => handleChange(e)}
              value={values.price}
              type="text"
              name="price"
              placeholder="Product Price"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control
              onChange={(e) =>
                setValues({ ...values, file: e.target.files[0] })
              }
              type="file"
              name="file"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Container>
    </div>
  );
}
