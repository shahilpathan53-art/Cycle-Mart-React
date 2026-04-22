import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    supplierId: "",
    product: "",
    quantity: "",
  });

  const navigate = useNavigate();

  // 🔹 Fetch all purchase orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/purchaseorders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ➕ Add new order
  const handleAddOrder = async (e) => {
    e.preventDefault();

    if (!form.supplierId || !form.product || !form.quantity) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/purchaseorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplierId: form.supplierId,
          productName: form.product,
          quantity: form.quantity,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add order");

      await fetchOrders();
      setForm({ supplierId: "", product: "", quantity: "" });
    } catch (err) {
      console.error("❌ Error adding order:", err);
      alert("Server Error: " + err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shortId = (id) => (!id ? "—" : id.slice(-4).toUpperCase());

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    const toast = document.createElement("div");
    toast.textContent = "✅ Supplier ID copied!";
    toast.style.cssText =
      "position:fixed;bottom:25px;left:50%;transform:translateX(-50%);background:#00c8a3;color:white;padding:10px 22px;border-radius:8px;font-size:15px;font-weight:500;box-shadow:0 3px 10px rgba(0,0,0,0.2);opacity:0;transition:opacity 0.3s ease;z-index:1000";
    document.body.appendChild(toast);
    setTimeout(() => (toast.style.opacity = "1"), 10);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 1500);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #001f3f, #0a2647)",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        paddingBottom: "60px",
      }}
    >
      {/* 🌟 Header */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
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
            🧾 Cycle Mart - Purchase Orders
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

      {/* 📦 Form + Orders Section */}
      <div className="container py-5">
        {/* ➕ Form */}
        <div
          className="p-4 mb-5 rounded-4 shadow-lg"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          <h5
            className="fw-bold text-center mb-4"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ➕ Create New Purchase Order
          </h5>

          <form
            onSubmit={handleAddOrder}
            className="row g-3 align-items-end justify-content-center"
          >
            <div className="col-md-4">
              <label className="form-label fw-semibold">Supplier ID</label>
              <input
                type="text"
                className="form-control form-control-lg rounded-3 bg-transparent text-light border-secondary-subtle"
                value={form.supplierId}
                onChange={(e) =>
                  setForm({ ...form, supplierId: e.target.value })
                }
                placeholder="Enter supplier ID"
                style={{ color: "#fff" }}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Product</label>
              <input
                type="text"
                className="form-control form-control-lg rounded-3 bg-transparent text-light border-secondary-subtle"
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                placeholder="Enter product name"
                style={{ color: "#fff" }}
              />
            </div>

            <div className="col-md-2">
              <label className="form-label fw-semibold">Quantity</label>
              <input
                type="number"
                className="form-control form-control-lg rounded-3 bg-transparent text-light border-secondary-subtle"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="Qty"
                style={{ color: "#fff" }}
              />
            </div>

            <div className="col-md-2 text-center">
              <button
                type="submit"
                className="btn fw-semibold rounded-pill btn-lg px-4"
                style={{
                  background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
                  border: "none",
                  color: "#001f3f",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.boxShadow = "0 0 18px rgba(29,233,182,0.8)")
                }
                onMouseOut={(e) => (e.target.style.boxShadow = "none")}
              >
                Add Order
              </button>
            </div>
          </form>
        </div>

        {/* 📋 Table */}
        <div
          className="p-4 rounded-4 shadow-lg animate__animated animate__fadeInUp"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          <h5
            className="fw-bold text-center mb-4"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📋 Purchase Orders List
          </h5>

          {orders.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-dark table-striped text-center align-middle mb-0">
                <thead>
                  <tr style={{ color: "#00c8a3" }}>
                    <th>Supplier ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th> {/* ✅ New Status column */}
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = "rgba(0,200,163,0.1)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td
                        onClick={() => copyId(order.supplierId)}
                        style={{
                          cursor: "pointer",
                          color: "#00c8a3",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                        }}
                        title={`Click to copy full ID: ${order.supplierId}`}
                      >
                        {shortId(order.supplierId)}
                      </td>
                      <td>{order.productName}</td>
                      <td>{order.quantity}</td>

                      {/* ✅ Status Display */}
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Completed"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                          style={{
                            padding: "8px 14px",
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                          }}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>

                      <td>{formatDate(order.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted mb-0 fs-5">
              No purchase orders yet 📦
            </p>
          )}
        </div>
      </div>

      {/* ✨ Animations */}
      <style>{`
        .animate__animated {
          animation-duration: 1s;
          animation-fill-mode: both;
        }
        .animate__fadeInUp {
          animation-name: fadeInUp;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default PurchaseOrders;
