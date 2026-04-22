import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardReports = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalPurchases: 0,
    totalProfit: 0,
    activeCustomers: 0,
    lowStockItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await fetch("http://localhost:4000/api/admin/dashboard-stats");
        const statsData = await statsRes.json();

        const purchaseRes = await fetch("http://localhost:4000/api/purchaseorders");
        const purchaseData = await purchaseRes.json();

        // ✅ Calculate total purchase = sum of (subtotal * quantity)
        const totalPurchaseAmount = purchaseData.reduce((acc, order) => {
          const subtotal = parseFloat(order.subtotal) || 0;
          const qty = parseFloat(order.quantity) || 0;
          return acc + subtotal * qty;
        }, 0);

        // 🧮 Calculate profit
        const totalSales = parseFloat(statsData.totalSales) || 0;
        const totalProfit = totalSales - totalPurchaseAmount;

        setStats({
          ...statsData,
          totalPurchases: totalPurchaseAmount,
          totalProfit, // ✅ FIXED
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #001f3f, #0a2647)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <div className="spinner-border text-info" role="status" style={{ width: "3rem", height: "3rem" }}></div>
        <p className="mt-3 fs-5 text-light">Loading dashboard reports...</p>
      </div>
    );
  }

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
            📈 Cycle Mart Dashboard Summary
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

      {/* 📊 Dashboard Cards */}
      <div className="container py-5">
        <div className="row g-4 text-center">
          {[
            {
              title: "Total Sales",
              value: `₹${stats.totalSales?.toLocaleString("en-IN") || 0}`,
              border: "#00c8a3",
              glow: "rgba(0,200,163,0.5)",
            },
            {
              title: "Total Purchases",
              value: `₹${stats.totalPurchases?.toLocaleString("en-IN") || 0}`,
              border: "#ffd54f",
              glow: "rgba(255,213,79,0.5)",
            },
            {
              title: "Total Profit",
              value: `₹${stats.totalProfit?.toLocaleString("en-IN") || 0}`,
              border: "#42a5f5",
              glow: "rgba(66,165,245,0.5)",
            },
            {
              title: "Active Customers",
              value: stats.activeCustomers || 0,
              border: "#26c6da",
              glow: "rgba(38,198,218,0.5)",
            },
            {
              title: "Low Stock Items",
              value: stats.lowStockItems || 0,
              border: "#ef5350",
              glow: "rgba(239,83,80,0.5)",
            },
          ].map((card, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div
                className="animate__animated animate__fadeInUp"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `2px solid ${card.border}`,
                  borderRadius: "20px",
                  padding: "30px 20px",
                  boxShadow: `0 0 20px ${card.glow}`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <h5 className="fw-semibold mb-3" style={{ color: card.border }}>
                  {card.title}
                </h5>
                <h2 className="fw-bold mb-0">{card.value}</h2>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted mt-5">
          ⚙️ Real-time insights powered by Cycle Mart Admin System
        </p>
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

export default DashboardReports;
