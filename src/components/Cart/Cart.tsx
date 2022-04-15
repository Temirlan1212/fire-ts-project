import React from "react";
import "./Cart.css";

const Cart = () => {
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
            <div className="item-info">
              <h3 className="item-title">Product Name</h3>
              <p className="price-amount">$12.99</p>
            </div>
          </div>
        </div>
        <div className="navigate">
          <button className="button button-pay">Pay</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
