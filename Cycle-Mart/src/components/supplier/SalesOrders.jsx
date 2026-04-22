import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SalesOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Fetch Orders
  useEffect(() => {
    const fetchSalesOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/purchaseorders");
        const data = await res.json();
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sorted);
      } catch (err) {
        console.error("Error fetching sales orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesOrders();
  }, []);

  const formatSupplierId = (id) => {
    if (!id) return "N/A";
    return String(id).toUpperCase().slice(-4);
  };

  // 🔄 Toggle Order Statuss
          const toggleStatus = async (orderId, currentStatus) => {
            const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";

            try {
              const res = await fetch(`http://localhost:4000/api/purchaseorders/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
              });

              const data = await res.json();

              if (res.ok) {
                setOrders((prev) =>
                  prev.map((o) =>
                    o._id === orderId ? { ...o, status: newStatus } : o
                  )
                );

                // 🎉 Sweet styled message
                Swal.fire({
                  icon: "success",
                  title: "Status Updated",
                  text: data.message || `Order marked as ${newStatus}`,
                  showConfirmButton: false,
                  timer: 1800,
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Failed",
                  text: data.error || "Could not update status",
                });
              }
            } catch (err) {
              console.error("Error updating order status:", err);
              Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong while updating order.",
              });
            }
          };

  // 🧮 Stats
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "Completed").length;
  const pendingOrders = totalOrders - completedOrders;
  const completionRate =
    totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

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
            📦 Supplier Dashboard - Purchase Orders
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

      {/* 📋 Orders Table */}
      <div className="container py-5">
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-info"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            ></div>
            <p className="mt-3 text-light">Loading Purchase orders...</p>
          </div>
        ) : (
          <>
            {/* ✅ Fulfillment Section */}
            <div
              className="animate__animated animate__fadeInUp shadow-lg rounded-4 mb-5 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
              }}
            >
              <div
                className="text-center py-3"
                style={{
                  background: "linear-gradient(90deg, #2196f3, #00c8a3)",
                  color: "#001f3f",
                }}
              >
                <h5 className="fw-bold mb-0">✅ Fulfillment Status</h5>
              </div>

              <div className="row text-center px-4 py-4">
                <div className="col-md-4 mb-3">
                  <h6 className="text-info mb-1">Total Orders</h6>
                  <h3 className="fw-bold text-light">{totalOrders}</h3>
                </div>
                <div className="col-md-4 mb-3">
                  <h6 className="text-success mb-1">Completed</h6>
                  <h3 className="fw-bold text-light">{completedOrders}</h3>
                </div>
                <div className="col-md-4 mb-3">
                  <h6 className="text-warning mb-1">Pending</h6>
                  <h3 className="fw-bold text-light">{pendingOrders}</h3>
                </div>
              </div>

              {/* 📈 Progress Bar */}
              <div className="px-4 pb-4">
                <p className="text-light mb-2">
                  Fulfillment Progress:{" "}
                  <span className="fw-bold text-success">
                    {completionRate}%
                  </span>
                </p>
                <div
                  style={{
                    height: "12px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.15)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${completionRate}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
                      transition: "width 1s ease-in-out",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* 📊 Purchase Orders Overview */}
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
                className="text-center py-3"
                style={{
                  background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
                  color: "#001f3f",
                }}
              >
                <h5 className="fw-bold mb-0">📊 Purchase Orders Overview</h5>
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
                      <th>Supplier ID</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <tr key={index} style={{ color: "#eee" }}>
                          <td className="fw-semibold">
                            {formatSupplierId(order.supplierId)}
                          </td>
                          <td>{order.productName || "—"}</td>
                          <td>{order.quantity || "—"}</td>
                          <td>
                            {order.date
                              ? new Date(order.date).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td>
                            {order.status === "Completed" ? (
                              <span className="text-success fw-semibold">
                                Completed
                              </span>
                            ) : (
                              <span className="text-warning fw-semibold">
                                Pending
                              </span>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                toggleStatus(order._id, order.status)
                              }
                              className="btn btn-sm fw-semibold"
                              style={{
                                background:
                                  order.status === "Completed"
                                    ? "#ffb74d"
                                    : "#00c8a3",
                                color: "#001f3f",
                                borderRadius: "20px",
                                transition: "0.3s",
                              }}
                            >
                              {order.status === "Completed"
                                ? "Mark Pending"
                                : "Mark Completed"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-4">
                          No sales orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ✨ Animation */}
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

export default SalesOrders;
