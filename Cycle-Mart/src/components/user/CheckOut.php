import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { product } = location.state || {};

  // Prepare cart items
  const cartItems = product
    ? [
        {
          id: product._id,
          name: product.product_name,
          price: product.price,
          quantity: product.quantity || "1 unit",
          count: 1,
        },
      ]
    : [];

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "COD",
  });

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `✅ Order Placed Successfully!\n\nThank you, ${formData.name}`
    );
    console.log("Order Details:", { ...formData, cartItems, totalPrice });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-success fw-bold mb-4">Checkout</h2>
      <div className="row">

        {/* Customer Information */}
        <div className="col-md-7">
          <div className="card shadow-lg p-4 border-0 mb-4">
            <h5 className="fw-bold text-success mb-3">Customer Information</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Shipping Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Payment Method</label>
                <select
                  name="payment"
                  className="form-select"
                  value={formData.payment}
                  onChange={handleChange}
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="Card">Credit/Debit Card</option>
                  <option value="UPI">UPI / Net Banking</option>
                </select>
              </div>

              <button type="submit" className="btn btn-success w-100 mt-2">
                Place Order
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <div className="card shadow-lg p-4 border-0">
            <h5 className="fw-bold text-success mb-3">Order Summary</h5>

            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div>
                    <strong>{item.name}</strong> ({item.quantity}) × {item.count}
                  </div>
                  <div>₹{item.price * item.count}</div>
                </div>
              ))
            ) : (
              <p className="text-muted">No items in cart</p>
            )}

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span className="text-success">₹{totalPrice}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
