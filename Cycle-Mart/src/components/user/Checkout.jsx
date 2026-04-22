import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemsFromState = location.state?.cartItems || [];

  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "COD",
  });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartItemsFromState }),
        });
        const data = await response.json();
        if (data.success) setCartItems(data.products);
        else alert("Failed to load product details");
      } catch (error) {
        console.error(error);
        alert("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🔹 Email validation
    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) setEmailError("Please enter a valid email address.");
      else setEmailError("");
    }

    // 🔹 Phone validation (Indian 10-digit numbers)
    if (name === "phone") {
      const phonePattern = /^[6-9]\d{9}$/;
      if (!phonePattern.test(value)) setPhoneError("Enter a valid 10-digit mobile number.");
      else setPhoneError("");
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || phoneError) {
      alert("⚠️ Please fix form errors before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          totalPrice,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Order Placed Successfully!");
        setTimeout(() => navigate("/user/orders"), 1000);
      } else {
        alert("❌ Order failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error placing order");
    }
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100 text-light"
        style={{ backgroundColor: "#001f3f" }}
      >
        <h4>⏳ Loading product details...</h4>
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#001f3f",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        padding: "60px 0",
      }}
    >
      <div className="container">
        {/* 🔙 Back Button */}
        <button
          className="btn fw-semibold mb-4"
          style={{
            backgroundColor: "transparent",
            border: "2px solid #00c8a3",
            color: "#00c8a3",
            borderRadius: "50px",
            padding: "8px 22px",
            transition: "all 0.3s ease",
          }}
          onClick={() => navigate(-1)}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#00c8a3";
            e.target.style.color = "#001f3f";
            e.target.style.boxShadow = "0 0 15px rgba(0,200,163,0.8)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#00c8a3";
            e.target.style.boxShadow = "none";
          }}
        >
          ← Back
        </button>

        <h2
          className="text-center fw-bold mb-5 animate__animated animate__fadeInDown"
          style={{
            background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🛒 Checkout
        </h2>

        <div className="row g-4">
          {/* 🧾 Customer Info */}
          <div className="col-md-7">
            <div
              className="card p-4 shadow-lg animate__animated animate__fadeInLeft"
              style={{
                backgroundColor: "#0a2647",
                border: "none",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <h5
                className="fw-bold mb-4"
                style={{ color: "#00c8a3", letterSpacing: "0.5px" }}
              >
                Customer Information
              </h5>

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-light">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-light">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                  />
                  {emailError && (
                    <small style={{ color: "#ff6b6b" }}>{emailError}</small>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-light">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control form-control-lg"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength="10"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                  />
                  {phoneError && (
                    <small style={{ color: "#ff6b6b" }}>{phoneError}</small>
                  )}
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-light">
                    Shipping Address
                  </label>
                  <textarea
                    name="address"
                    className="form-control form-control-lg"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                  ></textarea>
                </div>

                {/* Payment */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-light">
                    Payment Method
                  </label>
                  <select
                    name="payment"
                    className="form-select form-select-lg"
                    value={formData.payment}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#0d2a4d",
                      color: "#ffffff",
                      borderRadius: "10px",
                      border: "1px solid #00c8a3",
                      boxShadow: "inset 0 0 5px rgba(0,200,163,0.4)",
                      padding: "10px",
                      appearance: "none",
                    }}
                  >
                    <option value="COD" style={{ color: "#000" }}>
                      Cash on Delivery
                    </option>
                    <option value="Card" style={{ color: "#000" }}>
                      Credit/Debit Card
                    </option>
                    <option value="UPI" style={{ color: "#000" }}>
                      UPI / Net Banking
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn w-100 fw-semibold"
                  style={{
                    backgroundColor: "#00c8a3",
                    color: "#001f3f",
                    padding: "12px 0",
                    borderRadius: "50px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.boxShadow = "0 0 20px rgba(0,200,163,0.7)")
                  }
                  onMouseOut={(e) => (e.target.style.boxShadow = "none")}
                >
                  Place Order ✅
                </button>
              </form>
            </div>
          </div>

          {/* 💳 Order Summary */}
          <div className="col-md-5">
            <div
              className="card p-4 shadow-lg animate__animated animate__fadeInRight"
              style={{
                backgroundColor: "#0a2647",
                border: "none",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <h5
                className="fw-bold mb-4"
                style={{
                  color: "#00c8a3",
                  letterSpacing: "0.5px",
                  textShadow: "0 0 8px rgba(0,200,163,0.4)",
                }}
              >
                Order Summary
              </h5>

              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2"
                    style={{ fontSize: "16px" }}
                  >
                    <div>
                      <strong style={{ color: "#fff" }}>
                        {item.product_name}
                      </strong>{" "}
                      <span style={{ color: "#00c8a3" }}>
                        ({item.quantity} × ₹{item.price})
                      </span>
                    </div>
                    <div className="fw-semibold text-light">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted text-center">No items in cart</p>
              )}

              <hr className="text-secondary" />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span
                  style={{
                    color: "#00c8a3",
                    textShadow: "0 0 10px rgba(0,200,163,0.6)",
                  }}
                >
                  ₹{totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
