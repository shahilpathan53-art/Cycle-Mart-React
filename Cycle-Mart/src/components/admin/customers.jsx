import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load customers:", err);
        setLoading(false);
      });
  }, []);

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
      {/* 🌟 Header Bar */}
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
            👥 Cycle Mart - Registered Customers
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

      {/* 📋 Customers Table */}
      <div className="container py-5">
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-info"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-light">Fetching customers...</p>
          </div>
        ) : (
          <div
            className="animate__animated animate__fadeInUp shadow-lg p-0 rounded-4 overflow-hidden"
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
              <h5 className="fw-bold mb-0">Customer List</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-dark table-striped align-middle mb-0 text-center">
                <thead
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#00c8a3",
                  }}
                >
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registered On</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length > 0 ? (
                    customers.map((customer, index) => (
                      <tr key={index} style={{ color: "#eee" }}>
                        <td className="fw-semibold">{index + 1}</td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: "#00c8a3",
                              color: "#001f3f",
                              borderRadius: "8px",
                            }}
                          >
                            {typeof customer.user_id === "string"
                              ? customer.user_id.slice(-6).toUpperCase()
                              : typeof customer._id === "string"
                              ? customer._id.slice(-6).toUpperCase()
                              : "N/A"}
                          </span>
                        </td>
                        <td className="fw-semibold">{customer.name}</td>
                        <td>
                          <a
                            href={`mailto:${customer.email}`}
                            className="text-info text-decoration-none fw-semibold"
                          >
                            {customer.email}
                          </a>
                        </td>
                        <td>
                          {new Date(customer.created_at).toLocaleString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No customers found 😕
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ✨ Fade-in Animation */}
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

export default Customers;
