import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import firebase from "firebase/compat/app";
import fire from "../../../fire";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContext";

const AddProduct = () => {
  const firestore = fire.firestore();
  const navigate = useNavigate();

  const { product, setProduct, sendProducts } = useProducts();

  const handleInp = (e: any) => {
    if (e.target.name === "price") {
      let obj = {
        ...product,
        [e.target.name]: Number(e.target.value),
      };

      setProduct(obj);
    } else {
      let obj = {
        ...product,
        [e.target.name]: e.target.value,
      };

      setProduct(obj);
    }
  };

  return (
    <div>
      <input onChange={handleInp} name="name" placeholder="name" />
      <input
        onChange={handleInp}
        name="description"
        placeholder="description"
      />
      <input onChange={handleInp} name="picture" placeholder="picture" />
      <input onChange={handleInp} name="type" placeholder="type" />
      <Link to="/">
        <Button onClick={sendProducts}>Send</Button>
      </Link>
    </div>
  );
};

export default AddProduct;
