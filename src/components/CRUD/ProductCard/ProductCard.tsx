import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContext";
import Sort from "../../Sort/Sort";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./ProductCard.css";
import ProductDetails from "../ProductDetails/ProductDetails";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // bgcolor: "black",
  maxWidth: "900px",
  width: "100%",
  boxShadow: 100,
  border: "none",
};

const ProductCard = () => {
  const {
    data,
    FilterProducts,
    handleDelete,
    UpdateFieldsInADocument,
    sendProducts,
    fetchData,
    getOneProduct,
    comments,
    getComments,
    checkProductInCart,
    addProductToCart,
    oneProduct,
  } = useProducts();

  const [uuid, setUuid] = useState<any>("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  const navigate = useNavigate();
  console.log(comments);

  return (
    <div style={{}}>
      <Sort />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {data.map((data: any) => (
          <>
            <div className="albums">
              <div className="album">
                <img
                  className="album__artwork"
                  // src="https://source.unsplash.com/random/304x304?v=7"
                  src={data.picture}
                />
                <div className="album__details">
                  <h2>{data.name}</h2>
                  <p className="album__desc">{data.description}</p>

                  <div
                    className="album__details__btn-container"
                    onClick={() => {
                      handleOpen();
                      setUuid(data.id);
                    }}
                  >
                    interesting
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      {data.map((data: any) => {
        return uuid === data.id ? (
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            sx={{ border: "none" }}
          >
            <Box sx={style}>
              <figure className="pizza">
                <div className="pizza__hero">
                  <img src={data.picture} alt="Pizza" className="pizza__img" />
                </div>

                <div className="pizza__content">
                  <div className="pizza__title">
                    <h1 className="pizza__heading">{data.name} 👌</h1>
                    <div
                      className="pizza__tag pizza__tag--1"
                      onClick={() => navigate(`/edit/${data.id}`)}
                    >
                      edit
                    </div>
                    <div
                      className="pizza__tag pizza__tag--2"
                      onClick={() => handleDelete(data.id)}
                    >
                      delete
                    </div>
                  </div>
                  <p className="pizza__description">{data.description}</p>
                  <div className="pizza__details">
                    <p className="pizza__detail">
                      <span className="emoji">🍕</span>850 kcal
                    </p>
                    <p className="pizza__detail">
                      <span className="emoji">⏱</span>30 min
                    </p>
                    <p className="pizza__detail">
                      <span className="emoji"></span>{" "}
                      <ShoppingCartIcon
                        onClick={() => addProductToCart(data)}
                        sx={{ "&:hover": { color: "red" } }}
                        color={
                          checkProductInCart(data.id) ? "success" : "inherit"
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className="pizza__price">
                  {" "}
                  <Box
                    sx={{
                      color: "white",
                      fontSize: "30px",
                      cursor: "pointer",
                      "&:hover": { color: "red" },
                    }}
                    onClick={() => {
                      getOneProduct(data.id);
                      navigate(
                        `/list/${data.comId}/${comments.map((com: any) => {
                          return com.comId === data.comId ? com.id : null;
                        })}`
                      );
                    }}
                  >
                    see the comments
                  </Box>
                </div>
              </figure>
            </Box>
          </Modal>
        ) : null;
      })}
    </div>
  );
};

export default ProductCard;

// {comments.map((com: any) => (
//   <>
//     {com.comId === data.comId ? (
//       <div
//         onClick={() => {
//           getOneProduct(data.id2);
//           navigate(`/list/${data.id2}/${com.id}`);
//         }}
//       >
//         details
//       </div>
//     ) : (
//       ""
//     )}
//   </>
// ))}

// navigate(
//   `/list/${data.id2}/${comments.map((com: any) => {
//     return com.comId === data.comId ? "id" : "";
//   })}`
// );
