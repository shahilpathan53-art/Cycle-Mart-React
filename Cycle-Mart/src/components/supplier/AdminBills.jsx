import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminBills = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/purchaseorders");
        const data = await res.json();

        // ✅ Generate subtotal between 8000 and 30000, rounded to nearest 500
        for (const po of data) {
          if (!po.subtotal || po.subtotal === 0) {
            const min = 8000;
            const max = 30000;
            let randomSubtotal =
              Math.floor(Math.random() * (max - min + 1)) + min;

            // Round to nearest 500
            randomSubtotal = Math.round(randomSubtotal / 500) * 500;

            po.subtotal = randomSubtotal;

            // Save subtotal permanently in MongoDB
            await fetch(
              `http://localhost:4000/api/purchaseorders/${po._id}/subtotal`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subtotal: randomSubtotal }),
              }
            );
          }
        }

        // Sort by latest date
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setPurchaseOrders(sortedData);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, []);

  // ✅ Update payment status (Paid / Unpaid)
  const handlePaymentToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Paid" ? "Unpaid" : "Paid";

    try {
      const res = await fetch(
        `http://localhost:4000/api/purchaseorders/${id}/payment`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment: newStatus }),
        }
      );

      const result = await res.json();
      if (result.success) {
        setPurchaseOrders((prev) =>
          prev.map((po) =>
            po._id === id ? { ...po, payment: newStatus } : po
          )
        );
      }
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5 text-white">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading Admin Bills...</p>
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
              background: "linear-gradient(90deg, #ab47bc, #8e24aa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.8rem",
            }}
          >
            🧾 Admin Bills - Purchase Orders
          </h2>

          {/* ✅ Same Back Button as Products */}
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
              background: "linear-gradient(90deg, #ab47bc, #8e24aa)",
              color: "#fff",
            }}
          >
            <h5 className="fw-bold mb-0">🧾 Admin Bills</h5>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-striped align-middle text-center mb-0">
              <thead
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#ab47bc",
                }}
              >
                <tr>
                  <th>Supplier ID</th>
                  <th>Product Name</th>
                  <th>Subtotal (₹)</th>
                  <th>Quantity</th>
                  <th>Total Price (₹)</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.length > 0 ? (
                  purchaseOrders.map((po, i) => {
                    const subtotal = Number(po.subtotal) || 0;
                    const qty = Number(po.quantity) || 0;
                    const totalPrice = subtotal * qty;

                    return (
                      <tr key={i} style={{ color: "#eee" }}>
                        <td>
                          {po.supplierId
                            ? `SUP-${String(po.supplierId)
                                .slice(-4)
                                .toUpperCase()}`
                            : "N/A"}
                        </td>
                        <td>{po.productName}</td>
                        <td>₹{subtotal.toLocaleString("en-IN")}</td>
                        <td>{qty}</td>
                        <td>₹{totalPrice.toLocaleString("en-IN")}</td>
                        <td>{new Date(po.date).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`badge ${
                              po.payment === "Paid"
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {po.payment || "Unpaid"}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${
                              po.payment === "Paid"
                                ? "btn-outline-danger"
                                : "btn-outline-success"
                            }`}
                            onClick={() =>
                              handlePaymentToggle(po._id, po.payment)
                            }
                          >
                            {po.payment === "Paid"
                              ? "Mark Unpaid"
                              : "Mark Paid"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No purchase orders found.
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

export default AdminBills;
