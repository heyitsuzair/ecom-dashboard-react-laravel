import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/commons/Header/Header";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { getSingleProduct, server, updateProduct } from "../utils/apis/apis";

export default function UpdateProduct() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
    file: "",
  });

  const { id } = useParams();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);

    try {
      const { data } = await axios.post(updateProduct + "/" + id, formData);
      console.log(data);
    } catch (error) {
      alert("Something Went Wrong!");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const getProductInfo = async () => {
    try {
      const { data } = await axios.get(getSingleProduct + "/" + id);
      setValues(data);
    } catch (error) {
      alert("Something Went Wrong.Please Try Again!");
      console.log(error);
    }
  };

  useEffect(() => {
    getProductInfo();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("ecom-user")) {
      navigate("/");
      return;
    }
    //eslint-disable-next-line
  }, []);

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
              defaultValue={values.img_path}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-3">
            <img src={server + values.img_path} alt="Product" width={100} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </div>
  );
}
