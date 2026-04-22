import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newBill, setNewBill] = useState({
    billId: "",
    customerName: "",
    date: "",
    totalAmount: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/admin/customer-bills");
      const data = await res.json();
      setBills(data);
    } catch (err) {
      console.error("Error fetching bills:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBill((prev) => ({ ...prev, [name]: value }));
  };

  const generateBillId = () => {
    const randomId = "BILL-" + Math.floor(100000 + Math.random() * 900000);
    setNewBill((prev) => ({ ...prev, billId: randomId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBill.billId || !newBill.customerName || !newBill.date || !newBill.totalAmount) {
      alert("⚠️ Please fill all fields before adding!");
      return;
    }

    try {
      setAdding(true);
      const res = await fetch("http://localhost:4000/api/admin/customer-bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBill),
      });

      if (!res.ok) throw new Error("Failed to add bill");
      const savedBill = await res.json();
      setBills((prev) => [...prev, savedBill]);
      setNewBill({ billId: "", customerName: "", date: "", totalAmount: "" });
      alert("✅ Customer bill added successfully!");
    } catch (err) {
      console.error("Error adding bill:", err);
      alert("❌ Failed to add bill.");
    } finally {
      setAdding(false);
    }
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
      {/* 🌟 Header Section */}
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
            🧾 Customer Bills Dashboard
          </h2>

          {/* 🔙 Back Button */}
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

      {/* ➕ Add Bill Form */}
      <div className="container py-5">
        <div
          className="animate__animated animate__fadeInUp shadow-lg rounded-4 mb-5"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
          }}
        >
          <div
            className="text-center py-3 fw-bold"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              color: "#001f3f",
            }}
          >
            ➕ Add New Customer Bill
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmit} className="row g-3 text-light">
              <div className="col-md-3">
                <label className="form-label fw-semibold">Bill ID</label>
                <div className="input-group">
                  <input
                    type="text"
                    name="billId"
                    value={newBill.billId}
                    onChange={handleChange}
                    className="form-control bg-dark text-light border-0"
                    placeholder="Enter or generate ID"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={generateBillId}
                  >
                    🔄
                  </button>
                </div>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={newBill.customerName}
                  onChange={handleChange}
                  className="form-control bg-dark text-light border-0"
                  placeholder="Enter customer name"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newBill.date}
                  onChange={handleChange}
                  className="form-control bg-dark text-light border-0"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Total Amount (₹)</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={newBill.totalAmount}
                  onChange={handleChange}
                  className="form-control bg-dark text-light border-0"
                  placeholder="Enter amount"
                />
              </div>

              <div className="col-12 text-center mt-3">
                <button
                  type="submit"
                  className="btn btn-info px-5 fw-semibold"
                  disabled={adding}
                >
                  {adding ? "Adding..." : "Add Bill"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 📋 Bills Table */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-info"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            ></div>
            <p className="mt-3 fs-5 text-light">Loading customer bills...</p>
          </div>
        ) : bills.length === 0 ? (
          <p className="text-center text-muted">No customer bills found 😕</p>
        ) : (
          <div
            className="animate__animated animate__fadeInUp shadow-lg rounded-4 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="text-center py-3 fw-bold"
              style={{
                background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
                color: "#001f3f",
              }}
            >
              Customer Bills List
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
                    <th>Bill ID</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Total Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((bill, index) => (
                    <tr
                      key={index}
                      style={{
                        color: "#eee",
                        transition: "background 0.2s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(0,200,163,0.1)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td className="fw-semibold text-info">
                        {bill.billId || bill._id?.slice(-6)?.toUpperCase() || "N/A"}
                      </td>
                      <td>{bill.customerName || "—"}</td>
                      <td>{new Date(bill.date).toLocaleDateString("en-IN")}</td>
                      <td>₹{bill.totalAmount?.toLocaleString() || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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

export default CustomerBills;
