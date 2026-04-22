import React, { useState } from "react";
import ProductPage from "./ProductPage";
import Cart from "./Cart"; // ✅ Correct import

const Buy = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
      <div style={{ flex: 2 }}>
        <ProductPage cartItems={cartItems} setCartItems={setCartItems} />
      </div>
      <div style={{ flex: 1 }}>
        <Cart cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
};

export default Buy;
