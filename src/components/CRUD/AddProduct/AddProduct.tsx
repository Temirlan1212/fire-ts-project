import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import firebase from "firebase/compat/app";
import fire from "../../../fire";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContext";
import "./AddProduct.css";

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
    } else if (e.target.name === "select") {
      let obj = {
        ...product,
        type: e.target.value,
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
    <div className="main-admin__container">
      <div className="container11">
        <div className="c1">
          <div className="c11">
            <h1 className="mainhead">PICK YOUR SPOT</h1>
            <p className="mainp">
              Just click the buttons below to toggle between SignIn & SignUp
            </p>
          </div>
          <div id="left">
            <h1 className="s1className">
              <span>SIGN</span>
              <span className="su">IN</span>
            </h1>
          </div>
          <div id="right">
            <h1 className="s2className">
              <span>SIGN</span>
              <span className="su">UP</span>
            </h1>
          </div>
        </div>

        <div className="c2">
          <form className="signup">
            <input
              onChange={handleInp}
              name="name"
              placeholder="name"
              className="username"
            />

            <input
              type="text"
              onChange={handleInp}
              name="description"
              placeholder="description"
              className="username"
            />

            <input
              type="text"
              onChange={handleInp}
              name="picture"
              placeholder="picture"
              className="username"
            />

            <input
              onChange={handleInp}
              name="price"
              placeholder="price"
              className="username"
            />

            <select name="select" onChange={handleInp} className="username">
              <option value="pizza30">Pizza30</option>
              <option value="pizza40">Pizza40</option>
              <option value="breakfast">breakfast</option>
              <option value="cold-drinks">cold drinks</option>
              <option value="salad">salad</option>
              <option value="drink" selected>
                выбери тип
              </option>
            </select>
            <input
              type="text"
              onChange={handleInp}
              name="commnetsId"
              placeholder="commnetsId"
              className="username"
              style={{ border: "4px solid red" }}
              required
            />

            <Link to="/">
              <button onClick={sendProducts} className="btn">
                Send
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
