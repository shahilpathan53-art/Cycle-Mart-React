import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) setEmailError("Please enter a valid email address.");
      else setEmailError("");
    }

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError) {
      alert("⚠️ Please enter a valid email before submitting.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Thank you for your feedback! It has been saved successfully.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ Failed to send feedback: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error submitting feedback. Please try again.");
    }
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
        {/* Header */}
        <div className="text-center mb-5">
          <h1
            className="fw-bold display-5 mb-3 animate__animated animate__fadeInDown"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📞 Contact <span>Cycle Mart</span>
          </h1>
          <p
            className="lead animate__animated animate__fadeInUp"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            We'd love to hear from you! Have a question about our products or
            services? Our team is always ready to assist you.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Contact Info */}
          <div
            className="col-md-5 animate__animated animate__fadeInLeft"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="card h-100"
              style={{
                backgroundColor: "#0a2647",
                border: "none",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                padding: "35px",
              }}
            >
              <h4 className="fw-bold mb-3" style={{ color: "#00c8a3" }}>
                Our Office
              </h4>
              <p style={{ color: "rgba(255,255,255,0.8)" }}>
                <strong>Cycle Mart Headquarters</strong> <br />
                Valsad, Gujarat – 396001 <br />
                India
              </p>

              <h5 className="fw-bold mt-4" style={{ color: "#1de9b6" }}>
                Email
              </h5>
              <p style={{ color: "rgba(255,255,255,0.8)" }}>
                shahilpathan53@gmail.com <br />
                haider722690@gmail.com <br />
                sufyan.tai1328@gmail.com
              </p>

              <h5 className="fw-bold mt-4" style={{ color: "#1de9b6" }}>
                Phone
              </h5>
              <p style={{ color: "rgba(255,255,255,0.8)" }}>+91 98247 83191</p>
              <p style={{ color: "rgba(255,255,255,0.8)" }}>+91 93288 63073</p>
              <p style={{ color: "rgba(255,255,255,0.8)" }}>+91 70487 86776</p>
            </div>
          </div>

          {/* Feedback Form */}
          <div
            className="col-md-7 animate__animated animate__fadeInRight"
            style={{ animationDelay: "0.4s" }}
          >
            <div
              className="card"
              style={{
                backgroundColor: "#0a2647",
                border: "none",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                padding: "35px",
              }}
            >
              <h4 className="fw-bold mb-4" style={{ color: "#00c8a3" }}>
                Send Us Feedback
              </h4>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold" style={{ color: "#1de9b6" }}>
                    Name
                  </label>
                  <style>{`input::placeholder { color: #ffffff !important; opacity: 1; }`}</style>

                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter your name"
                    required
                    style={{
                      backgroundColor: "#001f3f",
                      color: "#fff",
                      border: "1px solid #00c8a3",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold" style={{ color: "#1de9b6" }}>
                    Email
                  </label>
                  <style>{`input::placeholder { color: #ffffff !important; opacity: 1; }`}</style>

                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    required
                    style={{
                      backgroundColor: "#001f3f",
                      color: "#fff",
                      border: "1px solid #00c8a3",
                      borderRadius: "10px",
                    }}
                  />
                  {emailError && (
                    <small style={{ color: "#ff6b6b" }}>{emailError}</small>
                  )}
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label
                    htmlFor="message"
                    className="form-label fw-semibold"
                    style={{ color: "#1de9b6" }}
                  >
                    Message
                  </label>
                  <style>{`textarea::placeholder { color: #ffffff !important; opacity: 1; }`}</style>

                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    rows="5"
                    placeholder="Write your feedback here..."
                    required
                    style={{
                      backgroundColor: "#001f3f",
                      color: "#fff",
                      border: "1px solid #00c8a3",
                      borderRadius: "10px",
                    }}
                  ></textarea>
                </div>

                {/* Glow Button */}
                <div style={{ position: "relative" }}>
                  <style>
                    {`
                      @keyframes neonGlow {
                        0% { box-shadow: 0 0 5px rgba(0,200,163,0.3), 0 0 10px rgba(0,200,163,0.5), 0 0 20px rgba(0,200,163,0.6); }
                        50% { box-shadow: 0 0 15px rgba(0,200,163,0.6), 0 0 25px rgba(0,200,163,0.8), 0 0 40px rgba(0,200,163,1); }
                        100% { box-shadow: 0 0 5px rgba(0,200,163,0.3), 0 0 10px rgba(0,200,163,0.5), 0 0 20px rgba(0,200,163,0.6); }
                      }
                      .glow-btn:hover {
                        animation: neonGlow 1.5s infinite alternate;
                        transform: scale(1.05);
                      }
                    `}
                  </style>

                  <button
                    type="submit"
                    className="fw-semibold rounded-pill shadow-sm mt-3 glow-btn"
                    style={{
                      backgroundColor: "#00c8a3",
                      color: "#001f3f",
                      border: "none",
                      padding: "12px 35px",
                      fontSize: "16px",
                      width: "100%",
                      borderRadius: "50px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 0 0 rgba(0, 200, 163, 0)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#f5f5f5ff";
                      e.target.style.boxShadow = "0 0 20px rgba(0,200,163,0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#001f3f";
                      e.target.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                    }}
                  >
                    ✉️ Send Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes (same as About Us) */}
      <style>{`
        .animate__animated { animation-duration: 1s; animation-fill-mode: both; }
        .animate__fadeInUp { animation-name: fadeInUp; }
        .animate__fadeInDown { animation-name: fadeInDown; }
        .animate__fadeInLeft { animation-name: fadeInLeft; }
        .animate__fadeInRight { animation-name: fadeInRight; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate3d(0, -20px, 0); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translate3d(-30px, 0, 0); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translate3d(30px, 0, 0); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
