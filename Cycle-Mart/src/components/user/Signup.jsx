import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    fetch("http://localhost:4000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(`✅ Signup successful! Welcome, ${formData.name}`);
          navigate("/login");
        } else {
          alert(`⚠️ Signup failed: ${data.message}`);
        }
      })
      .catch((err) => {
        console.error("Signup API Error:", err);
        alert("⚠️ An error occurred during signup.");
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #001f3f, #003566)",
        fontFamily: "Poppins, sans-serif",
        color: "#fff",
      }}
    >
      <div
        className="card shadow-lg p-4 border-0 animate__animated animate__fadeInUp"
        style={{
          width: "420px",
          borderRadius: "20px",
          backgroundColor: "#0a2647",
          boxShadow: "0 0 25px rgba(0, 200, 163, 0.3)",
        }}
      >
        {/* Header */}
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
            Join Cycle Mart
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)" }}>
            Create your account to explore top bikes 🚴‍♂️
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {[
            { id: "name", label: "Full Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone Number", type: "tel" },
            { id: "password", label: "Password", type: "password" },
            { id: "confirmPassword", label: "Confirm Password", type: "password" },
          ].map((field) => (
            <div className="mb-3" key={field.id}>
              <label
                htmlFor={field.id}
                className="form-label fw-semibold"
                style={{ color: "#e0e0e0" }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                value={formData[field.id]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  backgroundColor: "#16325b",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid #00c8a3";
                  e.target.style.boxShadow = "0 0 8px rgba(0,200,163,0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(255,255,255,0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          ))}

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
            🚴‍♀️ Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <p style={{ color: "#bbb" }}>Already have an account?</p>
          <Link
            to="/login"
            className="fw-bold"
            style={{
              color: "#00c8a3",
              textDecoration: "none",
            }}
          >
            Login Now 🔑
          </Link>
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

export default Signup;
