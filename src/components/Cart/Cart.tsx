import React, { useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, deleteCartProducts, getCart, fetchData, changeProductCount } =
    useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCountChange = (count: any, id: any) => {
    if (count <= 0 || count >= 1000) {
      count = 1;
      changeProductCount(count, id);
    } else {
      changeProductCount(count, id);
    }
  };

  return (
    <div>
      <div className="app">
        <div className="top">
          <div className="section-title">
            <h2>Your Cart</h2>
          </div>
        </div>
        <div className="cart-list">
          <div className="cart-item">
            <div className="item-image">
              {/* <img
                src="https://images.unsplash.com/photo-1486401899868-0e435ed85128?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=85"
                alt=""
              /> */}
            </div>
            {cart.products.map((cart: any) => (
              <div className="item-info">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "6px",
                  }}
                >
                  <input
                    className="username"
                    style={{
                      margin: "0",
                      width: "70px",
                      height: "20px",
                      backgroundColor: "black",
                      border: "1px solid grey",
                    }}
                    type="number"
                    min={1}
                    max={1000}
                    value={cart.count}
                    onChange={(e) =>
                      handleCountChange(e.target.value, cart.item.id)
                    }
                  />
                  <h3 className="item-title">{cart.item.name}</h3>
                </div>
                <DeleteOutlineIcon
                  onClick={() => {
                    deleteCartProducts(cart.item.id);
                  }}
                  className="cart-item__btn"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="navigate">
          <button className="button button-pay">
            Total price: {cart.totalPrice}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
