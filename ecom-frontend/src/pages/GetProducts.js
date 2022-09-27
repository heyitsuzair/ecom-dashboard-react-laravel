import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/commons/Header/Header";

export default function GetProducts() {
  const navigate = useNavigate();

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
    </div>
  );
}
