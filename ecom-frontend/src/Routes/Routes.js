import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "../pages/AddProduct";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpdateProduct from "../pages/UpdateProduct";
import GetProducts from "../pages/GetProducts";

export default function RoutesIndex() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/" element={<Login />} />
          <Route path="/getProducts" element={<GetProducts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </>
  );
}
