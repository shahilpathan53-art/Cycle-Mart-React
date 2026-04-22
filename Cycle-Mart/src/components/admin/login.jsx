import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing sessions
    localStorage.clear();
    sessionStorage.removeItem("supplierToken");
    sessionStorage.removeItem("supplierData");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("adminLoggedIn", "true");
      alert("✅ Admin login successful!");
      navigate("/admin/dashboard");
    } else {
      setError("❌ Invalid username or password");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #001f3f, #0a2647)",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
      className="d-flex align-items-center justify-content-center"
    >
      {/* 🔐 Glass Login Card */}
      <div
        className="animate__animated animate__fadeInUp shadow-lg rounded-4 p-5"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
        }}
      >
        <h2
          className="fw-bold text-center mb-3"
          style={{
            background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🔐 Admin Login
        </h2>
        <p className="text-center text-light mb-4">
          Please enter your credentials to continue
        </p>

        {error && (
          <div
            className="alert text-center py-2"
            style={{
              background: "rgba(255,0,0,0.1)",
              color: "#ff6b6b",
              border: "1px solid rgba(255,0,0,0.3)",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-light">
              Username
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0 rounded-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-light">
              Password
            </label>
            <input
              type="password"
              className="form-control bg-dark text-light border-0 rounded-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold mt-3"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              color: "#001f3f",
              border: "none",
              borderRadius: "30px",
              padding: "10px 0",
              fontSize: "1rem",
              transition: "0.3s",
              boxShadow: "0 0 12px rgba(0,200,163,0.5)",
            }}
            onMouseOver={(e) =>
              (e.target.style.boxShadow = "0 0 20px rgba(0,200,163,0.9)")
            }
            onMouseOut={(e) =>
              (e.target.style.boxShadow = "0 0 12px rgba(0,200,163,0.5)")
            }
          >
            Login
          </button>
        </form>

        <p
          className="text-center mt-4"
          style={{ color: "#ccc", fontSize: "0.9rem" }}
        >
          © {new Date().getFullYear()} Cycle Mart Admin Panel
        </p>
      </div>

      {/* ✨ Animation Styles */}
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

export default AdminLogin;
