import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  // 🧾 Checkout handler
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("⚠️ Please login first to proceed to checkout.");
      localStorage.setItem("redirectAfterLogin", "/checkout");
      navigate("/login");
      return;
    }

    const cartItemsForCheckout = cartItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));

    navigate("/checkout", { state: { cartItems: cartItemsForCheckout } });
  };

  // ❌ Remove / decrease quantity
  const handleRemove = (_id) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item._id === _id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className="cart-page min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #001f3f, #003366)",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="container">

        {/* 🔙 Back Button */}
        <button
          className="fw-semibold mb-4"
          style={{
            backgroundColor: "transparent",
            border: "2px solid #00c8a3",
            color: "#00c8a3",
            borderRadius: "50px",
            padding: "8px 20px",
            transition: "all 0.3s ease",
          }}
          onClick={() => navigate("/user/ProductPage")}
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
          ← Back to ProductPage
        </button>

        {/* 🏷️ Header */}
        <div className="text-center mb-5">
          <h1
            className="fw-bold display-5 mb-3 animate__animated animate__fadeInDown"
            style={{
              background: "linear-gradient(90deg, #00bfa6, #1de9b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🛒 Your Shopping Cart
          </h1>
          <p
            className="lead animate__animated animate__fadeInUp"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Review your selected items before checkout. Ride your dream bike today 🚴‍♂️
          </p>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div
            className="text-center bg-light text-dark p-5 rounded-4 shadow-lg animate__animated animate__fadeInUp"
            style={{
              maxWidth: "600px",
              margin: "auto",
              borderLeft: "5px solid #00bfa6",
            }}
          >
            <h4 className="fw-bold mb-3">Your cart is empty!</h4>
            <p className="text-muted">
              Browse our latest collection and add your favorite bikes.
            </p>
            <button
              className="btn fw-semibold mt-3"
              style={{
                backgroundColor: "#00bfa6",
                color: "#001f3f",
                borderRadius: "50px",
                padding: "10px 30px",
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate("/user/ProductPage")}
              onMouseOver={(e) =>
                (e.target.style.boxShadow = "0 0 15px rgba(0,191,166,0.7)")
              }
              onMouseOut={(e) => (e.target.style.boxShadow = "none")}
            >
              Browse Products →
            </button>
          </div>
        ) : (
          <div className="row g-4 animate__animated animate__fadeInUp">
            {cartItems.map((item) => (
              <div className="col-md-4 col-sm-6" key={item._id}>
                <div
                  className="card h-100 border-0 shadow-lg overflow-hidden"
                  style={{
                    borderRadius: "20px",
                    background: "linear-gradient(180deg, #f0fff9, #d8f3ff)",
                    color: "#001f3f",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                <div
                  style={{
                    height: "220px",
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
                >
                  <img
                    src={
                      item.imageUrl?.startsWith("http")
                        ? item.imageUrl
                        : `http://localhost:4000/img/${item.imageUrl}`
                    }
                    alt={item.name}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                  <div className="card-body text-center">
                    <h5 className="fw-bold">{item.name}</h5>
                    <p className="text-muted small">
                      ₹{item.price.toLocaleString()} each
                    </p>
                    <p className="fw-semibold">
                      Quantity:{" "}
                      <span style={{ color: "#00bfa6" }}>{item.quantity}</span>
                    </p>
                    <h6 className="text-success fw-bold mb-3">
                      Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                    </h6>

                    <button
                      className="fw-semibold btn btn-danger w-100 rounded-pill shadow-sm"
                      style={{
                        backgroundColor: "#ff4b5c",
                        border: "none",
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => handleRemove(item._id)}
                      onMouseOver={(e) =>
                        (e.target.style.boxShadow =
                          "0 0 10px rgba(255,75,92,0.7)")
                      }
                      onMouseOut={(e) => (e.target.style.boxShadow = "none")}
                    >
                      Remove 1
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Checkout Section */}
        {cartItems.length > 0 && (
          <div
            className="text-center mt-5 p-5 rounded-4 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #00bfa6, #1de9b6)",
              color: "#001f3f",
            }}
          >
            <h3 className="fw-bold mb-3">
              Total: ₹{totalPrice.toLocaleString()}
            </h3>
            <button
              onClick={handleCheckout}
              className="fw-bold rounded-pill shadow-sm"
              style={{
                backgroundColor: "#001f3f",
                color: "#fff",
                border: "none",
                padding: "12px 40px",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
             onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#eef1f3ff";
                        e.target.style.color = "#001f3f";
                        e.target.style.boxShadow =
                          "0 0 20px rgba(0,200,163,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#001f3f";
                        e.target.style.color = "#eef1f3ff";
                        e.target.style.boxShadow = "none";
                      }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>

      {/* Animation Keyframes */}
      <style>{`
        .animate__animated {
          animation-duration: 1s;
          animation-fill-mode: both;
        }
        .animate__fadeInUp {
          animation-name: fadeInUp;
        }
        .animate__fadeInDown {
          animation-name: fadeInDown;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate3d(0, -20px, 0); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default Cart;
