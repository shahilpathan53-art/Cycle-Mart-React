import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    purchaseOrders: 0,
    totalSales: 0,
  });
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const productsRes = await fetch("http://localhost:4000/api/products");
        const productsData = await productsRes.json();

        const poRes = await fetch("http://localhost:4000/api/purchaseorders");
        const poData = await poRes.json();

        const totalSales = poData.reduce((sum, po) => {
          const subtotal = Number(po.subtotal) || 0;
          const qty = Number(po.quantity) || 0;
          return sum + subtotal * qty;
        }, 0);

        setStats({
          products: productsData.length,
          purchaseOrders: poData.length,
          totalSales,
        });

        const latestOrders = poData
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setPurchaseOrders(latestOrders);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching supplier dashboard data:", err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("supplierLoggedIn");
    alert("👋 Supplier logged out successfully!");
    navigate("/supplier/login");
  };

  const formatSupplierId = (id) => {
    if (!id) return "N/A";
    const str = String(id).toUpperCase();
    return `SUP-${str.slice(-4)}`;
  };

  if (loading)
    return (
      <div className="text-center mt-5 text-white">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading dashboard...</p>
      </div>
    );

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
      {/* 🔷 Header */}
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
            🚴 Supplier Dashboard
          </h2>

          <div className="d-flex align-items-center gap-3">
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
              Hi Supplier
            </span>

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

      {/* 📊 Stats Section */}
      <div className="container py-5">
        <div className="row g-4">
          {[
            {
              title: "📦 Our Products",
              value: stats.products,
              color: "#1de9b6",
            },
            {
              title: "🧾 Purchase Orders",
              value: stats.purchaseOrders,
              color: "#26c6da",
            },
            {
              title: "💸 Total Sales (₹)",
              value: `₹${stats.totalSales.toLocaleString("en-IN")}`,
              color: "#ffb74d",
            },
          ].map((card, i) => (
            <div key={i} className="col-lg-4 col-md-6">
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
                <p className="fs-2 fw-bold mb-1">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔘 Buttons Section */}
        <div className="d-flex justify-content-center mb-5 gap-3 flex-wrap mt-5">
          {[
            { to: "/supplier/products", text: "📦 View Products", color: "#1de9b6" },
            { to: "/supplier/sales", text: "💰 View Sales", color: "#ffb74d" },
            { to: "/supplier/sales-orders", text: "🧾 Purchase Orders", color: "#26c6da" },
            { to: "/supplier/add-product", text: "➕ Add Product", color: "#64b5f6" },
            { to: "/supplier/bills", text: "🧾 Admin Bills", color: "#ab47bc" },
          ].map((btn, i) => (
            <NavLink
              key={i}
              to={btn.to}
              className="fw-semibold mt-3 d-inline-block"
              style={{
                backgroundColor: btn.color,
                color: "#001f3f",
                padding: "10px 25px",
                borderRadius: "30px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.boxShadow = `0 0 20px ${btn.color}`)
              }
              onMouseOut={(e) => (e.target.style.boxShadow = "none")}
            >
              {btn.text}
            </NavLink>
          ))}
        </div>

        {/* 🛒 Recent Orders */}
        <div className="card shadow-sm p-4 bg-dark text-white border-0">
          <h4 className="text-center mb-3 text-info">
            🛒 Recent Purchase Orders
          </h4>
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle text-center mb-0">
              <thead className="table-secondary text-dark">
                <tr>
                  <th>Supplier ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.length > 0 ? (
                  purchaseOrders.map((po, i) => (
                    <tr key={i}>
                      <td>{formatSupplierId(po.supplierId)}</td>
                      <td>{po.productName}</td>
                      <td>{po.quantity}</td>
                      <td>{new Date(po.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No purchase orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
