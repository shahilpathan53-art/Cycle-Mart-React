import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/booking")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load orders:", err);
        setLoading(false);
      });
  }, []);

  const getShipping = () => Math.floor(Math.random() * 200) + 50;

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
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1
            className="fw-bold display-5 mb-0 animate__animated animate__fadeInDown"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📦 My Orders
          </h1>
      {/* <div className="container"> */}
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
          onClick={() => navigate("/")} // ✅ Corrected navigation
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
          ← Back to Home
        </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status"></div>
            <p className="mt-3">Loading your orders...</p>
          </div>
        ) : (
          <div
            className="card animate__animated animate__fadeInUp"
            style={{
              backgroundColor: "#0a2647",
              border: "none",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              padding: "30px",
              color: "#fff",
            }}
          >
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle text-center mb-0">
                <thead
                  style={{
                    background:
                      "linear-gradient(90deg, #00c8a3 0%, #1de9b6 100%)",
                    color: "#001f3f",
                  }}
                >
                  <tr>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Sub Total (₹)</th>
                    <th>Shipping (₹)</th>
                    <th>Total (₹)</th>
                    <th>Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => {
                      const shipping = getShipping();
                      const total = order.totalPrice + shipping;

                      return (
                        <tr key={order._id}>
                          <td className="fw-semibold text-info">
                            {order._id.slice(-6).toUpperCase()}
                          </td>
                          <td>
                            <span
                              className={`badge rounded-pill px-3 py-2 fs-6 ${
                                order.status === "Delivered"
                                  ? "bg-success"
                                  : order.status === "Shipped"
                                  ? "bg-info text-dark"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {order.status || "Pending"}
                            </span>
                          </td>
                          <td>₹{Number(order.totalPrice || 0).toLocaleString()}</td>
                          <td>₹{Number(shipping).toLocaleString()}</td>
                          <td className="fw-bold text-success">
                            ₹{Number(total).toLocaleString()}
                          </td>
                          <td>
                            {new Date(order.orderDate).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                            })}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-5 text-muted">
                        You have no orders yet 🛒
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Animations (same as AboutUs) */}
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

export default UserOrders;
