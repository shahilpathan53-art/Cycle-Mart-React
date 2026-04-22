import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler (connected to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Product added successfully!");
        setFormData({ name: "", brand: "", price: "", imageUrl: "" });
        navigate(-1); // Go back after success
      } else {
        alert("❌ Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("⚠️ Server error. Check console for details.");
    }
  };

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
            🛒 Supplier Dashboard - Add Product
          </h2>
        </div>
      </div>

      {/* 🧾 Form Section */}
      <div className="container py-5">
        <div
          className="animate__animated animate__fadeInUp shadow-lg rounded-4 p-4"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          <h4
            className="text-center fw-bold mb-4"
            style={{
              background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ➕ Add New Product
          </h4>

          {/* ✅ Connected Form */}
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control text-light"
                  placeholder="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control text-light"
                  placeholder="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control text-light"
                  placeholder="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              </div>
            </div>

            <div className="row g-4 mt-3">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control text-light"
                  placeholder="Image URL / Path"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="fw-semibold"
                style={{
                  backgroundColor: "#ffb74d",
                  color: "#001f3f",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "30px",
                  boxShadow: "0 0 12px rgba(255,183,77,0.5)",
                  transition: "0.3s",
                }}
              >
                ← Back
              </button>

              <button
                type="submit"
                className="fw-semibold"
                style={{
                  background: "linear-gradient(90deg, #00c8a3, #1de9b6, #00c8a3)",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "30px",
                  color: "#001f3f",
                  boxShadow: "0 0 12px rgba(0,200,163,0.5)",
                  transition: "0.3s",
                }}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
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

export default AddProduct;
