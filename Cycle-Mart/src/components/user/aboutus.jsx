import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import "bootstrap/dist/css/bootstrap.min.css";

const AboutUs = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleExploreClick = () => {
    navigate("/user/ProductPage");
  };

  return (
    <div
      style={{
        backgroundColor: "#001f3f",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        padding: "60px 0",
      }}
    >
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1
            className="fw-bold display-5 mb-3 animate__animated animate__fadeInDown"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🚴‍♂️ About <span>Cycle Mart</span>
          </h1>
          <p
            className="lead animate__animated animate__fadeInUp"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Your trusted partner for all things cycling — quality bikes
            & adventure gear.
          </p>
        </div>

        {/* Main Card Section */}
        <div
          className="card animate__animated animate__fadeInUp"
          style={{
            backgroundColor: "#0a2647",
            border: "none",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            padding: "40px",
            color: "#fff",
          }}
        >
          <p className="fs-5 mb-4">
            Welcome to{" "}
            <span style={{ color: "#00c8a3", fontWeight: "bold" }}>
              Cycle Mart
            </span>
            , where every ride begins with trust and passion. We aim to empower
            riders with{" "}
            <span style={{ color: "#1de9b6", fontWeight: "bold" }}>
              premium bicycles
            </span>{" "}
            and{" "}
            <span style={{ color: "#1de9b6", fontWeight: "bold" }}>
              top-quality bikes
            </span>{" "}
            that make cycling smoother, safer, and more enjoyable 🚴‍♀️.
          </p>

          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderLeft: "5px solid #00c8a3",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "25px",
              boxShadow: "0 0 10px rgba(0,200,163,0.2)",
            }}
          >
            <p className="fs-5 mb-0">
              <strong>Cycle Mart</strong> bridges the gap between brands and
              riders by offering{" "}
              <span style={{ color: "#00c8a3", fontWeight: "bold" }}>
                certified bikes
              </span>
              ,{" "}
              <span style={{ color: "#00c8a3", fontWeight: "bold" }}>
                trusted bikes
              </span>{" "}
              and{" "}
              <span style={{ color: "#00c8a3", fontWeight: "bold" }}>
                competitive prices
              </span>
              . Experience doorstep delivery, transparent pricing, and dedicated
              customer support with every purchase.
            </p>
          </div>

          <p className="fs-5">
            Whether you're an occasional rider or a pro cyclist, Cycle Mart
            delivers{" "}
            <span style={{ color: "#1de9b6", fontWeight: "bold" }}>
              safety gear, maintenance tools, and performance bikes
            </span>{" "}
            that help you go further and ride smarter 🌿.
          </p>

          {/* CTA Button with Glow Effect */}
          <div className="text-center mt-4">
            <button
              className="fw-semibold rounded-pill shadow-sm"
              style={{
                backgroundColor: "#00c8a3",
                color: "#001f3f",
                border: "none",
                padding: "12px 35px",
                fontSize: "16px",
                borderRadius: "50px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 0 0 rgba(0, 200, 163, 0)", // smooth transition
              }}
              onClick={handleExploreClick}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#00c8a3";
                e.target.style.color = "#f5f5f5ff";
                e.target.style.boxShadow = "0 0 20px rgba(0,200,163,0.8)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#00c8a3";
                e.target.style.color = "#001f3f";
                e.target.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                e.target.style.transform = "scale(1)";
              }}
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        .animate__animated {
          animation-duration: 1s;
          animation-fill-mode: both;
        }
        .animate__fadeInUp {
          animation-name: fadeInUp;
        }
        .animate__fadeInDown {
          animation-name: fadeInDown;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate3d(0, -20px, 0); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
