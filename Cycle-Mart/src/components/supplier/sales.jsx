import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/purchaseorders");
        const data = await res.json();

        // ✅ Format data properly
        const formatted = data.map((order) => {
          const quantity = Number(order.quantity || 1);
          const subtotal = Number(order.subtotal || 0);
          const total = subtotal * quantity;

          // ✅ Smart Supplier ID formatting
          const supplierId = (() => {
            if (!order.supplierId) return "N/A";

            const id = order.supplierId.trim();

            // Short & clean IDs (e.g. 1A11, 1A12, 1A14)
            if (/^[A-Z0-9]+$/i.test(id) && id.length <= 6) {
              return `SUP-${id.toUpperCase()}`;
            }

            // Long MongoDB-like IDs → show last 3–4 chars only
            const shortCode = id.slice(-3).toUpperCase();
            return `SUP-${shortCode}`;
          })();

          return {
            supplierId,
            productName: order.productName || "—",
            totalPrice: total,
            date: order.date || new Date(),
          };
        });

        // ✅ Sort by latest date first
        const sorted = formatted.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setPurchaseOrders(sorted);
      } catch (err) {
        console.error("Error fetching purchase orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, []);

  // ✅ Calculate grand total
  const grandTotal = purchaseOrders.reduce(
    (sum, o) => sum + o.totalPrice,
    0
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
      {/* 🌟 Header */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
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
            📦 Purchase Orders Overview
          </h2>

          <button
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
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* 📋 Table Section */}
      <div className="container py-5">
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-info"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            ></div>
            <p className="mt-3 text-light">Loading purchase orders...</p>
          </div>
        ) : (
          <div
            className="shadow-lg rounded-4 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="text-center py-3"
              style={{
                background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
                color: "#001f3f",
              }}
            >
              <h5 className="fw-bold mb-0">📋 Purchase Orders Summary</h5>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-striped align-middle text-center mb-0">
                <thead style={{ color: "#00c8a3" }}>
                  <tr>
                    <th>Supplier ID</th>
                    <th>Product Name</th>
                    <th>Total Price (₹)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.length > 0 ? (
                    purchaseOrders.map((order, index) => (
                      <tr key={index}>
                        <td className="fw-semibold text-info">
                          {order.supplierId}
                        </td>
                        <td>{order.productName}</td>
                        <td className="fw-bold text-success">
                          ₹{order.totalPrice.toLocaleString("en-IN")}
                        </td>
                        <td>
                          {new Date(order.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No purchase orders found.
                      </td>
                    </tr>
                  )}

                  {/* ✅ Grand Total Row */}
                  {purchaseOrders.length > 0 && (
                    <tr
                      style={{
                        background: "rgba(0,200,163,0.2)",
                        borderTop: "2px solid #00c8a3",
                      }}
                    >
                      <td colSpan="2" className="fw-bold text-end pe-3">
                        GRAND TOTAL:
                      </td>
                      <td className="fw-bold text-success">
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
