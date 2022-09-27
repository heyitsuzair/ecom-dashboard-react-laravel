import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/commons/Header/Header";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import { login } from "../utils/apis/apis";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios.post(login, values).then(({ data }) => {
      if (data.error === false) {
        localStorage.setItem("ecom-user", JSON.stringify(data.user));
        navigate("/addProduct");
      } else {
        alert(data.message);
        return;
      }
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
    <div>
      <Header />
      <Container className="mt-4">
        <Form onSubmit={(e) => handleFormSubmit(e)}>
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
    </div>
  );
}
