import React, { useState } from "react";
import Header from "../components/commons/Header/Header";
import axios from "axios";
import { search, server } from "../utils/apis/apis";
import { Container, Table } from "react-bootstrap";
export default function SearchProducts() {
  const [data, setData] = useState([]);

  const handleSearch = async (e) => {
    if (e.target.value.length > 1) {
      try {
        const { data } = await axios.get(search + "/" + e.target.value);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <Header />
      <div className="col-6 offset-3 mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search Product"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <Container className="mt-4 col-md-8">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
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
