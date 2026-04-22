import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails) {
      navigate("/login");
    } else {
      setUser(userDetails);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  if (!user) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#001f3f" }}
      >
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );
  }

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
        {/* Header */}
        <div className="text-center mb-5 animate__animated animate__fadeInDown">
          <h1
            className="fw-bold display-5 mb-3"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            👤 My Profile
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }}>
            Manage your account details, view your role, and log out securely.
          </p>
        </div>

        {/* Profile Card */}
        <div
          className="card mx-auto shadow-lg border-0 rounded-4 p-4 text-center animate__animated animate__fadeInUp"
          style={{
            backgroundColor: "#0a2647",
            color: "#fff",
            maxWidth: "500px",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name || "User"
            )}&background=00c8a3&color=fff&size=128`}
            alt="Profile Avatar"
            className="rounded-circle mx-auto mb-3"
            style={{
              width: "120px",
              height: "120px",
              border: "3px solid #00c8a3",
              boxShadow: "0 0 15px rgba(0,200,163,0.5)",
            }}
          />

          <h4 className="fw-bold mb-1" style={{ color: "#1de9b6" }}>
            {user.name || "User"}
          </h4>
          <p className="text-light mb-3" style={{ opacity: 0.8 }}>
            {user.email || "No email provided"}
          </p>

          <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

          <div className="text-start px-4">
            <p>
              <strong style={{ color: "#00c8a3" }}>Joined:</strong>{" "}
              {user.joinDate || "Recently"}
            </p>
            <p>
              <strong style={{ color: "#00c8a3" }}>Role:</strong>{" "}
              {user.role || "Customer"}
            </p>
          </div>

          <button
            className="fw-semibold mt-4"
            style={{
              backgroundColor: "#00c8a3",
              color: "#001f3f",
              border: "none",
              padding: "12px 35px",
              fontSize: "16px",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.boxShadow = "0 0 20px rgba(0,200,163,0.7)")
            }
            onMouseOut={(e) => (e.target.style.boxShadow = "none")}
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Animations */}
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
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
