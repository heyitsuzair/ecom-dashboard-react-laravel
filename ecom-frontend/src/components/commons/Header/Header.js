import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
  const user = JSON.parse(localStorage.getItem("ecom-user"));

  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">Navbar</Link>
        </Navbar.Brand>
        <Nav className="me-auto nav_bar_wrapper" gap={3}>
          {localStorage.getItem("ecom-user") ? (
            <>
              <Link to="/addProduct">Add Product</Link>
              <Link to="/updateProduct">Update Product</Link>
            </>
          ) : (
            <>
              <Link to="/">Login</Link>

              <Link to="/register">Register</Link>
            </>
          )}
        </Nav>
        {localStorage.getItem("ecom-user") && (
          <Nav className="mr-auto">
            <NavDropdown title={user.name}>
              <NavDropdown.Item
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
