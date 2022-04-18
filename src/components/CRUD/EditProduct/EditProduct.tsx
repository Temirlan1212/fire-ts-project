import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import fire from "../../../fire";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContext";
import { Box } from "@mui/system";

const EditProduct = () => {
  const firestore = fire.firestore();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    UpdateFieldsInADocument,
    fetchData,
    getOneProduct,
    data,
    oneProduct,
  } = useProducts();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    picture: "",
    type: "",
  });

  useEffect(() => {
    getOneProduct(id);
  }, []);

  useEffect(() => {
    setProduct(oneProduct);
  }, [oneProduct]);

  const handleInput = (e: any, product: any, setProduct: any) => {
    let obj = {
      ...product,
      [e.target.name]: e.target.value,
    };
    setProduct(obj);
  };

  return (
    <div>
      <Box>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            margin: "10vh auto",
            boxShadow: 3,
            borderRadius: 3,
            bgcolor: "#ffcc80",
            width: "500px",
          }}
        >
          <form>
            <TextField
              // value={data.map((elem: any) => {
              //   return elem.id === id ? elem.name : "";
              // })}
              value={product.name}
              fullWidth
              id="outlined-basic"
              label="NAME"
              variant="outlined"
              name="name"
              onChange={(e) => handleInput(e, product, setProduct)}
            />
            <TextField
              // value={data.map((elem: any) => {
              //   return elem.id === id ? elem.description : "";
              // })}
              value={product.description}
              fullWidth
              id="outlined-basic"
              label="DESCRIPTION"
              variant="outlined"
              name="description"
              onChange={(e) => handleInput(e, product, setProduct)}
            />{" "}
            <TextField
              // value={data.map((elem: any) => {
              //   return elem.id === id ? elem.picture : "";
              // })}
              value={product.picture}
              fullWidth
              id="outlined-basic"
              label="picture"
              variant="outlined"
              name="picture"
              onChange={(e) => handleInput(e, product, setProduct)}
            />{" "}
            <TextField
              // value={data.map((elem: any) => {
              //   return elem.id === id ? elem.type : "";
              // })}
              value={product.type}
              fullWidth
              id="outlined-basic"
              label="type"
              variant="outlined"
              name="type"
              onChange={(e) => handleInput(e, product, setProduct)}
            />
            <Stack direction="row" spacing={2} sx={{ bgcolor: "#000" }}>
              <Link to="/">
                <Button
                  id="button"
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={async () => {
                    await UpdateFieldsInADocument(id, {
                      name: product.name,
                      description: product.description,
                      picture: product.picture,
                      type: product.type,
                    });
                  }}
                >
                  EDIT
                </Button>
              </Link>
            </Stack>
          </form>
        </Grid>
      </Box>
    </div>
  );
};

export default EditProduct;
