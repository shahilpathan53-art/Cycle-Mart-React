import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  fetch("http://localhost:4000/api/booking")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched orders:", data);

      // Mark missing prices
      data.forEach((o) => {
        if (!o.totalPrice)
          console.warn("⚠️ Missing totalPrice for order:", o._id);
      });

      // 🔹 Sort orders so today's orders come first
      const today = new Date().toISOString().split("T")[0];
      const sorted = data.sort((a, b) => {
        const dateA = new Date(a.orderDate).toISOString().split("T")[0];
        const dateB = new Date(b.orderDate).toISOString().split("T")[0];

        // If both are today, keep normal descending order
        if (dateA === today && dateB === today) {
          return new Date(b.orderDate) - new Date(a.orderDate);
        }

        // If A is today but B is not → A comes first
        if (dateA === today) return -1;
        if (dateB === today) return 1;

        // Otherwise sort by most recent date
        return new Date(b.orderDate) - new Date(a.orderDate);
      });

      setOrders(sorted);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to load orders:", err);
      setLoading(false);
    });
}, []);


  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:4000/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
        );
        toast.success("✅ Order status updated!");
      } else toast.error("❌ Failed to update order status");
    } catch {
      toast.error("⚠️ Server error while updating status");
    }
  };

  const handlePaymentChange = async (id, newPaymentStatus) => {
    try {
      const res = await fetch(`http://localhost:4000/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_status: newPaymentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === id ? { ...o, payment_status: newPaymentStatus } : o
          )
        );
        toast.success("💰 Payment status updated!");
      } else toast.error("❌ Failed to update payment status");
    } catch {
      toast.error("⚠️ Server error while updating payment status");
    }
  };

  const getShipping = () => Math.floor(Math.random() * 200) + 50;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #001f3f, #0a2647)",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />

      {/* 🔹 Header */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: "20px 0",
          boxShadow: "0 2px 15px rgba(0,0,0,0.3)",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <h2
            className="fw-bold m-0"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.8rem",
            }}
          >
            🧾 Cycle Mart - Orders List
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="fw-semibold"
            style={{
              backgroundColor: "#ffb74d",
              color: "#001f3f",
              border: "none",
              padding: "8px 18px",
              borderRadius: "30px",
              boxShadow: "0 0 12px rgba(255,183,77,0.5)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.boxShadow = "0 0 20px rgba(255,183,77,0.9)")
            }
            onMouseOut={(e) =>
              (e.target.style.boxShadow = "0 0 12px rgba(255,183,77,0.5)")
            }
          >
            ← Back
          </button>
        </div>
      </div>

      {/* 📦 Orders Table */}
      <div className="container py-5">
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-info"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            ></div>
            <p className="mt-3 text-light">Loading orders...</p>
          </div>
        ) : (
          <div
            className="animate__animated animate__fadeInUp shadow-lg rounded-4 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <div
              className="text-center py-3"
              style={{
                background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
                color: "#001f3f",
              }}
            >
              <h5 className="fw-bold mb-0">Customer Orders</h5>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-striped align-middle text-center mb-0">
                <thead
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#00c8a3",
                  }}
                >
                  <tr>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Sub Total (₹)</th>
                    <th>Shipping (₹)</th>
                    <th>Total (₹)</th>
                    <th>Payment</th>
                    <th>Date</th>
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

                          {/* Status */}
                          <td>
                            <select
                              className={`form-select text-center fw-semibold ${
                                order.status === "Delivered"
                                  ? "bg-success text-white"
                                  : order.status === "Shipped"
                                  ? "bg-info text-dark"
                                  : "bg-warning text-dark"
                              }`}
                              value={order.status || "Pending"}
                              onChange={(e) =>
                                handleStatusChange(order._id, e.target.value)
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>

                          {/* Prices */}
                          <td className={order.totalPrice ? "" : "text-danger"}>
                            ₹{Number(order.totalPrice || 0).toLocaleString()}
                          </td>
                          <td>₹{shipping.toLocaleString()}</td>
                          <td className="fw-bold text-success">
                            ₹{total.toLocaleString()}
                          </td>

                          {/* Payment */}
                          <td>
                            <select
                              className={`form-select text-center fw-semibold ${
                                order.payment_status === "Paid"
                                  ? "bg-success text-white"
                                  : "bg-danger text-white"
                              }`}
                              value={order.payment_status || "Unpaid"}
                              onChange={(e) =>
                                handlePaymentChange(order._id, e.target.value)
                              }
                            >
                              <option value="Unpaid">Unpaid</option>
                              <option value="Paid">Paid</option>
                            </select>
                          </td>

                          {/* Date */}
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
                      <td colSpan="7" className="text-center text-muted py-4">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .animate__animated { animation-duration: 1s; animation-fill-mode: both; }
        .animate__fadeInUp { animation-name: fadeInUp; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default Orders;
