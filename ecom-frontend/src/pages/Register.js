import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { register } from "../utils/apis/apis";
import { useNavigate } from "react-router-dom";
import Header from "../components/commons/Header/Header";
export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios.post(register, values).then(({ data }) => {
      localStorage.setItem("ecom-user", JSON.stringify(data));
      navigate("/addProduct");
    });
  };

  useEffect(() => {
    if (localStorage.getItem("ecom-user")) {
      navigate("/addProduct");
      return;
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Form onSubmit={(e) => handleFormSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => handleChange(e)}
              value={values.name}
              name="name"
              type="text"
              placeholder="Enter Your Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => handleChange(e)}
              value={values.email}
              type="email"
              name="email"
              placeholder="Enter Email Address"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => handleChange(e)}
              value={values.password}
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
