import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/suppliers")
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load suppliers:", err);
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
            🏭 Cycle Mart - Supplier Management
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

      {/* 📋 Supplier Table Section */}
      <div className="container py-5">
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-info"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            ></div>
            <p className="mt-3 text-light fs-5">Fetching supplier data...</p>
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
              <h5 className="fw-bold mb-0">Registered Suppliers</h5>
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
                    <th>ID</th>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.length > 0 ? (
                    suppliers.map((supplier, index) => (
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
                          {supplier.id || supplier._id?.slice(-6)?.toUpperCase() || "N/A"}
                        </td>
                        <td className="fw-medium">
                          {supplier.company_name || "—"}
                        </td>
                        <td>
                          <a
                            href={`mailto:${supplier.email}`}
                            className="text-decoration-none text-light"
                          >
                            {supplier.email}
                          </a>
                        </td>
                        <td>
                          {supplier.createdAt
                            ? new Date(supplier.createdAt).toLocaleString(
                                "en-IN",
                                { timeZone: "Asia/Kolkata" }
                              )
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No suppliers available 😕
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ✨ Animation Keyframes */}
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

export default Suppliers;
