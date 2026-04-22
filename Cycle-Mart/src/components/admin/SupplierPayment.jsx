import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SupplierPayment = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/purchaseorders")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPurchaseOrders(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching purchase orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5 text-white">
        <div className="spinner-border text-info" role="status"></div>
        <p className="mt-3">Loading Supplier Payments...</p>
      </div>
    );

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
      {/* 🌟 Header with Back Button */}
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
            💰 Supplier Payments
          </h2>

          {/* 🔙 Back Button (Same as PurchaseOrders) */}
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

      {/* 💵 Payments Table */}
      <div className="container py-5">
        {message && (
          <div
            className="alert alert-info text-center fw-semibold"
            style={{ borderRadius: "10px" }}
          >
            {message}
          </div>
        )}

        <div
          className="card shadow-sm p-4 bg-dark text-white border-0 rounded-4"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle text-center mb-0 rounded-3">
              <thead className="table-secondary text-dark">
                <tr>
                  <th>Supplier ID</th>
                  <th>Product Name</th>
                  <th>Subtotal (₹)</th>
                  <th>Quantity</th>
                  <th>Total Price (₹)</th>
                  <th>Date</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.length > 0 ? (
                  purchaseOrders.map((po, i) => (
                    <tr
                      key={i}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(0,200,163,0.1)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td>
                        {po.supplierId
                          ? `SUP-${String(po.supplierId)
                              .slice(-4)
                              .toUpperCase()}`
                          : "N/A"}
                      </td>
                      <td>{po.productName}</td>
                      <td>₹{po.subtotal?.toLocaleString("en-IN") || 0}</td>
                      <td>{po.quantity}</td>
                      <td>
                        ₹
                        {(po.subtotal * po.quantity).toLocaleString("en-IN") ||
                          0}
                      </td>
                      <td>{new Date(po.date).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge ${
                            po.payment === "Paid"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                          style={{
                            fontSize: "0.9rem",
                            padding: "6px 12px",
                            borderRadius: "12px",
                          }}
                        >
                          {po.payment || "Unpaid"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-muted">
                      No purchase orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierPayment;
