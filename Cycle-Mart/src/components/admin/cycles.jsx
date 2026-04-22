import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cycles = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    imageUrl: "",
  });
  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const { name, brand, price, imageUrl } = formData;
    if (!name || !brand || !price || !imageUrl) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    fetch("http://localhost:4000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, brand, price: Number(price), imageUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "✅ Product added successfully!");
        setFormData({ name: "", brand: "", price: "", imageUrl: "" });
        fetchProducts();
      })
      .catch((err) => console.error("Add failed:", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "🗑️ Product deleted");
        fetchProducts();
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  // ✅ Fully working update (with all fields)
  const handleUpdate = (id, product) => {
    const newName = prompt("Enter new product name:", product.name);
    const newBrand = prompt("Enter new brand name:", product.brand);
    const newPrice = prompt("Enter new price (₹):", product.price);
    const newImageUrl = prompt("Enter new image URL:", product.imageUrl);

    if (
      newName === null ||
      newBrand === null ||
      newPrice === null ||
      newImageUrl === null
    )
      return;

    if (!newName || !newBrand || !newPrice || !newImageUrl) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    fetch(`http://localhost:4000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        brand: newBrand,
        price: Number(newPrice),
        imageUrl: newImageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "✅ Product updated successfully!");
        fetchProducts();
      })
      .catch((err) => console.error("Update failed:", err));
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
      {/* Header */}
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
            🚲 Cycle Mart - Product List
          </h2>
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

      {/* Add Product */}
      <div className="container my-5">
        <div
          className="p-4 rounded-4 shadow-lg animate__animated animate__fadeInDown"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 6px 25px rgba(0,0,0,0.4)",
          }}
        >
          <h4
            className="fw-bold mb-4 text-center"
            style={{
              color: "#00c8a3",
              textShadow: "0 0 10px rgba(0,200,163,0.6)",
            }}
          >
            ➕ Add New Product
          </h4>

          <form
            onSubmit={handleAddProduct}
            className="row g-3 justify-content-center"
          >
            {[
              { label: "Product Name", name: "name", type: "text" },
              { label: "Brand", name: "brand", type: "text" },
              { label: "Price (₹)", name: "price", type: "number" },
              { label: "Image URL", name: "imageUrl", type: "text" },
            ].map((field, i) => (
              <div className="col-md-3" key={i}>
                <label className="form-label fw-semibold text-light">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                  required
                />
              </div>
            ))}

            <div className="col-md-12 text-center mt-3">
              <button
                type="submit"
                className="btn fw-semibold px-5 py-2"
                style={{
                  backgroundColor: "#00c8a3",
                  color: "#001f3f",
                  borderRadius: "30px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.boxShadow = "0 0 20px rgba(0,200,163,0.7)")
                }
                onMouseOut={(e) => (e.target.style.boxShadow = "none")}
              >
                Add Product 🚀
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Product Table */}
      <div className="container py-4">
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-info"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            ></div>
            <p className="mt-3 text-light">Loading products...</p>
          </div>
        ) : (
          <div
            className="animate__animated animate__fadeInUp shadow-lg rounded-4 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="text-center py-3"
              style={{
                background: "linear-gradient(90deg, #00c8a3, #1de9b6)",
                color: "#001f3f",
              }}
            >
              <h5 className="fw-bold mb-0">Available Cycles</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-dark table-striped align-middle text-center mb-0">
                <thead
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#00c8a3",
                  }}
                >
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price (₹)</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={index} style={{ color: "#eee" }}>
                        <td className="fw-semibold">
                          {product._id
                            ? product._id.slice(-6).toUpperCase()
                            : "N/A"}
                        </td>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td className="fw-bold text-success">
                          ₹{product.price?.toLocaleString("en-IN")}
                        </td>
                        <td>
                                <img
                                  src={
                                    product.imageUrl && product.imageUrl.trim() !== ""
                                      ? product.imageUrl
                                      : "https://via.placeholder.com/120x120.png?text=No+Image"
                                  }
                                  alt={product.name || "Cycle Image"}
                                  className="shadow-sm"
                                  style={{
                                    width: "130px",           // ✅ wider
                                    height: "100px",          // ✅ balanced height
                                    objectFit: "contain",     // ✅ shows entire cycle properly
                                    borderRadius: "10px",
                                    border: "2px solid rgba(0,200,163,0.5)",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    display: "block",
                                    margin: "auto",
                                    padding: "5px",           // ✅ adds space inside border
                                  }}
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/120x100.png?text=No+Image";
                                  }}
                                  onMouseOver={(e) => {
                                    e.target.style.transform = "scale(1.08)";
                                    e.target.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.25)";
                                  }}
                                  onMouseOut={(e) => {
                                    e.target.style.transform = "scale(1)";
                                    e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
                                  }}
                                />
                        </td>
                        <td>
                          <button
                            className="btn btn-sm fw-semibold me-2"
                            style={{
                              backgroundColor: "#ffb74d",
                              color: "#001f3f",
                              border: "none",
                              borderRadius: "8px",
                            }}
                            onClick={() => handleUpdate(product._id, product)}
                          >
                            ✏️ Update
                          </button>
                          <button
                            className="btn btn-sm fw-semibold"
                            style={{
                              backgroundColor: "#ef5350",
                              color: "#fff",
                              border: "none",
                              borderRadius: "8px",
                            }}
                            onClick={() => handleDelete(product._id)}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No products available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cycles;
