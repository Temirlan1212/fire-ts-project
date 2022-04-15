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

  const { UpdateFieldsInADocument, fetchData, setData } = useProducts();

  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    picture: "",
    type: "",
  });

  console.log(product);

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
              fullWidth
              id="outlined-basic"
              label="NAME"
              variant="outlined"
              name="name"
              onChange={handleInp}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="DESCRIPTION"
              variant="outlined"
              name="description"
              onChange={handleInp}
            />{" "}
            <TextField
              fullWidth
              id="outlined-basic"
              label="picture"
              variant="outlined"
              name="picture"
              onChange={handleInp}
            />{" "}
            <TextField
              fullWidth
              id="outlined-basic"
              label="type"
              variant="outlined"
              name="type"
              onChange={handleInp}
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
