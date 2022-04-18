import { MenuItem } from "@mui/material";
import React from "react";
import ProductList from "../components/CRUD/ProductList/ProductList";
import Navbar from "../components/Navbar/Navbar";
import Slider2 from "../components/Slider2/Slider2";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        // background:
        //   "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 60%, rgba(255,255,255,0) 30%, rgba(34,0,0,30) 100%)",
      }}
    >
      <Navbar />

      <Slider2 />

      <ProductList />
    </div>
  );
};

export default HomePage;
