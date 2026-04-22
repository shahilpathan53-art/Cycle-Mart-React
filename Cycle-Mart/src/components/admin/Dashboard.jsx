import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    customers: "",
    suppliers: "",
    products: "",
    sales: "",
    reports: "",
    totalSalesAmount: "",
    purchaseOrders: "",
    bills: "",
  });
  const [loading, setLoading] = useState(true);

  // 📊 Fetch Stats
  useEffect(() => {
      // ❌ Remove user login if admin logs in
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userData");
        
    fetch("http://localhost:4000/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setLoading(false);
      });
  }, []);

  const displayValue = (value) => (loading ? "..." : value || 0);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    alert("🔒 Admin logged out successfully!");
    navigate("/admin/login");
  };

  // 🧩 Card Data Array (including Bills)
  const dashboardCards = [
    {
      title: "👥 Registered Customers",
      value: stats.customers,
      color: "#00c8a3",
      link: "/admin/customers",
      btnText: "Manage Customers",
    },
    {
      title: "🚲 Available Cycles",
      value: stats.products,
      color: "#1de9b6",
      link: "/admin/cycles",
      btnText: "Manage Cycles",
    },
    {
      title: "💸 Sales Orders",
      value: stats.sales,
      color: "#ffb74d",
      link: "/admin/orders",
      btnText: "View Orders",
      extra: `Revenue: ₹${displayValue(
        stats.totalSalesAmount?.toLocaleString("en-IN")
      )}`,
    },
    {
      title: "🏭 Cycle Suppliers",
      value: stats.suppliers,
      color: "#ffd54f",
      link: "/admin/suppliers",
      btnText: "Manage Suppliers",
    },
    {
      title: "🧾 Purchase Orders",
      value: stats.purchaseOrders || 0,
      color: "#26c6da",
      link: "/admin/purchase-orders",
      btnText: "Manage Purchase Orders",
    },
    {
      title: "💰 Supplier Payments",
      value: stats.purchaseOrders || 0, // 👈 same count
      color: "#4fc3f7",
      link: "/admin/supplier-payments",
      btnText: "Manage Supplier Payments",
    },
    {
      title: "📊 User Reports",
      value: stats.reports || 10,
      color: "#81c784",
      link: "/admin/reports",
      btnText: "View Reports",
    },
    {
      title: "📈 Overall Reports",
      value: "6",
      color: "#64b5f6",
      link: "/admin/dashboard-reports",
      btnText: "View Overall Reports",
    },
    {
      title: "🧾 Bills",
      value: stats.bills,
      color: "#00c8a3",
      link: "/admin/customer-bills",
      btnText: "View Bills",
      isBill: true,
    },
    // 🆕 Added Feedback Card
    {
      title: "💬 User Feedbacks",
      value: stats.feedbacks || 0,
      color: "#ff80ab",
      link: "/admin/feedbacks",
      btnText: "View Feedbacks",
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #001f3f, #0a2647)",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        paddingBottom: "80px",
      }}
    >
     {/* 🔷 Header Bar */}
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
                  🚴 Cycle Mart - Admin Dashboard
                </h2>

                {/* 🔹 Right side: Admin tag + Logout button */}
                <div className="d-flex align-items-center gap-3">
                  {/* 👑 Admin tag */}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
                      color: "#001f3f",
                      fontWeight: "600",
                      padding: "8px 18px",
                      borderRadius: "25px",
                      boxShadow: "0 0 10px rgba(0,200,163,0.5)",
                    }}
                  >
                   Hi Admin
                  </span>

                  {/* 🚪 Logout Button */}
                  <button
                    className="fw-semibold"
                    style={{
                      backgroundColor: "#ff4d4d",
                      color: "#fff",
                      border: "none",
                      padding: "8px 18px",
                      borderRadius: "30px",
                      boxShadow: "0 0 12px rgba(255,77,77,0.5)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.boxShadow = "0 0 20px rgba(255,77,77,0.9)")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.boxShadow = "0 0 12px rgba(255,77,77,0.5)")
                    }
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>


      {/* 📦 Main Content */}
      <div className="container py-5">
        <div className="row g-4">
          {dashboardCards.map((card, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div
                className="text-center p-4 animate__animated animate__fadeInUp"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "20px",
                  boxShadow: "0 6px 25px rgba(0,0,0,0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 25px ${card.color}90`)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 25px rgba(0,0,0,0.4)")
                }
              >
                <h5 className="fw-bold mb-3" style={{ color: card.color }}>
                  {card.title}
                </h5>
                <p className="fs-2 fw-bold mb-1">{displayValue(card.value)}</p>
                {card.extra && (
                  <p className="fs-6" style={{ color: "#aaa" }}>
                    {card.extra}
                  </p>
                )}

                {/* 🧾 If it's the Bills card, show 2 buttons */}
                {card.isBill ? (
                  <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                    <NavLink
                      to="/admin/customer-bills"
                      className="fw-semibold"
                      style={{
                        backgroundColor: "#00c8a3",
                        color: "#001f3f",
                        borderRadius: "30px",
                        padding: "10px 25px",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.boxShadow = "0 0 20px #00c8a3")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.boxShadow = "none")
                      }
                    >
                      👤 Customer Bills
                    </NavLink>
                    <NavLink
                      to="/admin/supplier-bills"
                      className="fw-semibold"
                      style={{
                        backgroundColor: "#ffd54f",
                        color: "#001f3f",
                        borderRadius: "30px",
                        padding: "10px 25px",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.boxShadow = "0 0 20px #ffd54f")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.boxShadow = "none")
                      }
                    >
                      🏭 Supplier Bills
                    </NavLink>
                  </div>
                ) : (
                  <NavLink
                    to={card.link}
                    className="fw-semibold mt-3 d-inline-block"
                    style={{
                      backgroundColor: card.color,
                      color: "#001f3f",
                      padding: "10px 25px",
                      borderRadius: "30px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.boxShadow = `0 0 20px ${card.color}`)
                    }
                    onMouseOut={(e) => (e.target.style.boxShadow = "none")}
                  >
                    {card.btnText}
                  </NavLink>
                )}
              </div>
            </div>
          ))}
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

export default Dashboard;

