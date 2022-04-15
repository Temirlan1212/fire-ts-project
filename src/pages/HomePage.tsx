import { MenuItem } from "@mui/material";
import React from "react";
import ProductList from "../components/CRUD/ProductList/ProductList";
import Navbar from "../components/Navbar/Navbar";
import Slider2 from "../components/Slider2/Slider2";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  return (
    <div style={{ height: "2000px", backgroundColor: "black" }}>
      <Navbar />

      <Slider2 />

      <ProductList />
    </div>
  );
};

export default HomePage;
