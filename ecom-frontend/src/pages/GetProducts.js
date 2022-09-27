import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/commons/Header/Header";
import { getProducts, server, deleteProduct } from "../utils/apis/apis";

export default function GetProducts() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("ecom-user")) {
      navigate("/");
      return;
    }
    //eslint-disable-next-line
  }, []);

  const getAllProducts = async () => {
    await axios.get(getProducts).then(({ data }) => {
      setData(data);
    });
  };

  const handleProductDelete = async (productId) => {
    try {
      await axios.delete(deleteProduct + "/" + productId).then(({ data }) => {
        if (data.error === false) {
          const filterProducts = data.filter((item) => {
            return item.id !== productId;
          });
          setData(filterProducts);
        } else {
          alert(data.message);
          return;
        }
      });
    } catch (error) {
      alert("Something Went Wrong! Please Try Again!");
    }
  };

  useEffect(() => {
    getAllProducts();
    //eslint-disable-next-line
  }, [data]);

  return (
    <div>
      <Header />
      <Container className="mt-4 col-md-8">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length < 1 ? (
              <tr>
                <td colSpan={12} style={{ textAlign: "center" }}>
                  No Data Found
                </td>
              </tr>
            ) : (
              data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td style={{ textAlign: "center" }}>
                      <img
                        src={server + item.img_path}
                        width={100}
                        alt="Product"
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleProductDelete(item.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => navigate("/updateProduct/" + item.id)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
