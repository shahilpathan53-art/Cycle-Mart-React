import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userDetails", JSON.stringify(data.user));
        setMessage("✅ Welcome to Cycle Mart!");

        setTimeout(() => {
          const addAfterLogin = localStorage.getItem("addAfterLogin");
          const redirect = localStorage.getItem("redirectAfterLogin");

          if (addAfterLogin) {
            const product = JSON.parse(addAfterLogin);
            localStorage.removeItem("addAfterLogin");
            localStorage.setItem("pendingCartProduct", JSON.stringify(product));
            navigate("/user/ProductPage");
          } else if (redirect) {
            localStorage.removeItem("redirectAfterLogin");
            navigate(redirect);
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        setMessage("⚠️ Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("⚠️ Server error, please try again later.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #001f3f, #003566)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        className="card shadow-lg p-4 border-0 animate__animated animate__fadeInUp"
        style={{
          width: "400px",
          borderRadius: "20px",
          backgroundColor: "#0a2647",
          color: "#fff",
          boxShadow: "0 0 25px rgba(0, 200, 163, 0.3)",
        }}
      >
        {/* Logo and Heading */}
        <div className="text-center mb-4">
          <img
            src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/128506932/original/fc2cc4ed40a86e26ded7636386e2c9f3b0d9532d/make-a-fantastic-logo-for-you.jpg"
            alt="Cycle Mart Logo"
            width="80"
            className="mb-2 rounded-circle shadow-sm border border-teal"
          />
          <h2
            className="fw-bold"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Cycle Mart Login
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)" }}>
            Welcome back! Please login to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-light">Email</label>
            <input
              type="email"
              placeholder="user@cyclemart.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              style={{
                borderRadius: "10px",
                backgroundColor: "#102c57",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-light">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              style={{
                borderRadius: "10px",
                backgroundColor: "#102c57",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>

          <button
            type="submit"
            className="w-100 fw-semibold"
            style={{
              backgroundColor: "#00c8a3",
              color: "#001f3f",
              border: "none",
              padding: "12px 0",
              borderRadius: "50px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.boxShadow = "0 0 20px rgba(0,200,163,0.7)")
            }
            onMouseOut={(e) => (e.target.style.boxShadow = "none")}
          >
            🚴‍♂️ Login
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`alert mt-3 text-center ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
            style={{
              backgroundColor: message.includes("✅")
                ? "rgba(0,200,163,0.2)"
                : "rgba(255,0,0,0.1)",
              color: message.includes("✅") ? "#00c8a3" : "#ff4d4d",
              border: "none",
              borderRadius: "10px",
            }}
          >
            {message}
          </div>
        )}

        {/* Signup Link */}
        <p className="text-center mt-4 mb-0" style={{ color: "#bbb" }}>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="fw-bold"
            style={{
              color: "#00c8a3",
              textDecoration: "none",
            }}
          >
            Sign Up Now 🚴‍♀️
          </Link>
        </p>
      </div>

      {/* Animation Styles */}
      <style>{`
        .animate__animated {
          animation-duration: 1s;
          animation-fill-mode: both;
        }
        .animate__fadeInUp {
          animation-name: fadeInUp;
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
      `}</style>
    </div>
  );
};

export default Login;
