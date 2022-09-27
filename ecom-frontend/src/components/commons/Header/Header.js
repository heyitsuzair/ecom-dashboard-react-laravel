import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Header() {
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
      </Container>
    </Navbar>
  );
}
