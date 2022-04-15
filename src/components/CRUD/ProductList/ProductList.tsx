import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContext";
import fire from "../../../fire";
import Cart from "../../Cart/Cart";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList: React.FC<React.ReactNode> = () => {
  const firestore = fire.firestore();

  const { setId, data, FilterProducts, handleDelete, sendProducts } =
    useProducts();

  return (
    <div
      style={{
        width: "1030px",
        display: "flex",
        margin: "0 auto",
        justifyContent: "space-between",
      }}
    >
      <ProductCard />
      <Cart />
    </div>
  );
};

export default ProductList;
