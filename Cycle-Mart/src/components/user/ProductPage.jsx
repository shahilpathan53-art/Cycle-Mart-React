import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ProductPage = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setFilteredProducts(data || []);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        (product.brand && product.brand.toLowerCase().includes(term))
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      localStorage.setItem("addAfterLogin", JSON.stringify(product));
      alert("⚠️ Please login first to add products to the cart.");
      navigate("/login");
      return;
    }

    const existingItem = cartItems.find((item) => item._id === product._id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    setMessage(`✅ "${product.name}" added to your cart!`);
    setTimeout(() => setMessage(null), 2200);
  };

  const handleBuyNowClick = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("⚠️ Please login first to buy this product.");
      localStorage.setItem("buyAfterLogin", JSON.stringify(product));
      navigate("/login");
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
    setShowQtyModal(true);
  };

  const confirmPurchase = () => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert("❌ Please enter a valid quantity.");
      return;
    }

    navigate("/checkout", {
      state: {
        cartItems: [{ ...selectedProduct, quantity: parseInt(quantity, 10) }],
      },
    });
    setShowQtyModal(false);
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  return (
    <div className="pageFade animate__animated animate__fadeInUp" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #001f3f 0%, #003a6b 100%)" }}>
      
      {/* HEADER */}
      <header
       className="animate__animated animate__fadeInDown"
        style={{
          background: "linear-gradient(135deg,#001f3f 0%, #003a6b 100%)",
          color: "#fff",
          padding: "48px 20px",
          borderBottomLeftRadius: "18px",
          borderBottomRightRadius: "18px",
          boxShadow: "0 6px 30px rgba(0,0,0,0.12)",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 320px" }}>
              <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700, lineHeight: 1.1 }}>
                🚴‍♂️ <span style={{ color: "#00c8a3" }}>Explore</span> Our Premium Cycles
              </h1>
              <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.85)" }}>
                High quality, tested bikes — pick what fits your ride and budget.
              </p>
            </div>

            <div style={{ flex: "0 0 420px", width: "100%", maxWidth: "520px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="🔍 Search cycles, brand or model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "999px",
                    border: "2px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                    outline: "none",
                    fontSize: "15px",
                    transition: "all 0.2s ease",
                  }}
                />
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "2px solid rgba(255, 255, 255, 0.18)",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontWeight: 600,
                  backdropFilter: "blur(6px)",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.18)";
                  e.target.style.border = "2px solid #00c8a3";
                  e.target.style.boxShadow = "0 0 12px rgba(0,200,163,0.6)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.08)";
                  e.target.style.border = "2px solid rgba(255,255,255,0.18)";
                  e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Clear
              </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* MAIN */}
      <main 
      className="animate__animated animate__fadeInUp"
      style={{ padding: "36px 20px",
         background: "linear-gradient(135deg, #002b4c 0%, #00c8a3 100%)",
       }}>
        <div className="container" style={{ maxWidth: 1200 }}>

          {message && (
            <div
              className="shadow-lg"
              style={{
                backgroundColor: "#00c8a3",
                color: "#001f3f",
                padding: "10px 16px",
                borderRadius: "12px",
                display: "inline-block",
                marginBottom: "16px",
                fontWeight: 700,
              }}
            >
              {message}
            </div>
          )}

          <section
          style={{
            background: "linear-gradient(135deg, #001f3f 0%, #0077b6 100%)",
            borderRadius: "14px",
            padding: "20px",
            boxShadow: "0 8px 30px rgba(2,24,39,0.06)",
          }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "18px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <button
                  onClick={() => navigate("/")}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "999px",
                    backgroundColor: "transparent",
                    border: "2px solid #00c8a3",
                    color: "#00c8a3",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#00c8a3";
                    e.target.style.color = "#001f3f";
                    e.target.style.boxShadow = "0 0 15px rgba(0,200,163,0.8)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#00c8a3";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  ← Back
                </button>

                <span style={{ color: "#fefcfcff", fontSize: 14 }}>
                  Showing {filteredProducts.length} products
                </span>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "low") {
                      setFilteredProducts([...filteredProducts].sort((a, b) => (a.price || 0) - (b.price || 0)));
                    } else if (val === "high") {
                      setFilteredProducts([...filteredProducts].sort((a, b) => (b.price || 0) - (a.price || 0)));
                    } else {
                      setFilteredProducts(products);
                    }
                  }}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid #e6eef6",
                    background: "#fbfdff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                  defaultValue=""
                >
                  <option value="">Sort</option>
                  <option value="low">Price: Low → High</option>
                  <option value="high">Price: High → Low</option>
                </select>
              </div>
            </div>

            <div className="row g-4">
              {filteredProducts.length === 0 ? (
                <div className="col-12 text-center" style={{ padding: "36px 12px", color: "#777" }}>
                  {searchTerm ? "😕 No cycles match your search." : "⏳ Loading products..."}
                </div>
              ) : (
                filteredProducts.map((product, idx) => (
                  <div key={product._id || idx} className="col-lg-3 col-md-4 col-sm-6">
                    <div
                      className="product-card"
                      style={{
                        background: "#0f2540",
                        color: "#fff",
                        borderRadius: 12,
                        overflow: "hidden",
                        boxShadow: "0 6px 20px rgba(2,24,39,0.06)",
                        transition: "transform 0.28s ease, box-shadow 0.28s ease",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        minHeight: 360,
                        animationName: "cardFadeIn",
                        animationDuration: "600ms",
                        animationFillMode: "both",
                        animationDelay: `${idx * 80}ms`,
                      }}
                    >
                      <div
                        style={{ padding: 14, textAlign: "center", background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)" }}
                      >
                        <div
                          style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", padding: 8, cursor: "pointer" }}
                          onClick={() => openQuickView(product)}
                        >
                          <img
                            src={
                              product.imageUrl?.startsWith("http")
                                ? product.imageUrl
                                : `http://localhost:4000/img/${product.imageUrl}`
                            }
                            alt={product.name}
                            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", borderRadius: 8 }}
                          />
                        </div>
                      </div>

                      <div style={{ padding: "14px 16px", flex: "1 1 auto" }}>
                        <h5 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{product.name}</h5>
                        <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.75)", fontSize: 13 }}>
                          Brand: {product.brand || "N/A"}
                        </p>

                        <div style={{ marginTop: 12 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                            <div style={{ fontWeight: 800, color: "#00c8a3", fontSize: 18 }}>
                              ₹{product.price ? product.price.toLocaleString() : "N/A"}
                            </div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{product.condition || ""}</div>
                          </div>

                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              onClick={() => handleBuyNowClick(product)}
                              style={{
                                flex: 1,
                                padding: "10px 8px",
                                borderRadius: 10,
                                border: "none",
                                backgroundColor: "#ffb74d",
                                color: "#001f3f",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                                onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#001f3f";
                                e.target.style.color = "#ffb74d";
                                e.target.style.boxShadow =
                                  "0 0 20px rgba(222, 129, 35, 0.84)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#ffb74d";
                                e.target.style.color = "#001f3f";
                                e.target.style.boxShadow = "none";
                              }}
                            >
                               Buy Now
                            </button>

                            <button
                              onClick={() => handleAddToCart(product)}
                              style={{
                                padding: "10px 8px",
                                borderRadius: 10,
                                border: "2px solid rgba(244, 243, 243, 1)",
                                background: "transparent",
                                color: "#00c8a3",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                             onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#f6f8faff";
                                e.target.style.color = "#00c8a3";
                                e.target.style.boxShadow =
                                  "0 0 20px rgba(0,200,163,0.6)";
                              }}
                               onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#001f3f";
                            e.target.style.color = "#00c8a3";
                            e.target.style.boxShadow = "none";
                          }}
                            >
                              🛒 Add
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

          </section>
        </div>
      </main>

      {/* Floating cart */}
    <button
      onClick={() => navigate("/cart")}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        width: "72px",
        height: "72px",
        background: "#001f3f",
        backdropFilter: "blur(10px)",
        borderRadius: "50%",
        color: "#00c8a3",
        border: "2px solid rgba(255,255,255,0.4)",
        fontSize: "30px",
        boxShadow: "0 6px 25px rgba(0,0,0,0.25)",
        cursor: "pointer",
        zIndex: 99999,
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.12)";
        e.target.style.boxShadow = "0 8px 30px rgba(255,255,255,0.5)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "0 6px 25px rgba(0,0,0,0.25)";
      }}
    >
      🛒
    </button>

      {/* Quantity Modal */}
      {showQtyModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(2,6,23,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: 16,
          }}
        >
          <div style={{ width: "100%", maxWidth: 420, borderRadius: 12, overflow: "hidden"  }}>
            <div style={{ background: "linear-gradient(90deg,#001f3f,#013462)", padding: 18, color: "#fff" }}>
              <h5 style={{ margin: 0 }}>{selectedProduct?.name}</h5>
              <div style={{ marginTop: 6 }}>Enter quantity</div>
            </div>

            <div style={{ background: "#071630", padding: 18 }}>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  color: "#fff",
                  outline: "none",
                }}
              />

              <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                <button
                  onClick={confirmPurchase}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "none",
                    background: "#ffb74d",
                    color: "#001f3f",
                    fontWeight: 800,
                  }}
                >
                  Confirm
                </button>

                <button
                  onClick={() => setShowQtyModal(false)}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "2px solid #ffb74d",
                    background: "transparent",
                    color: "#ffb74d",
                    fontWeight: 700,
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {showQuickView && quickViewProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10050,
            padding: 16,
          }}
          onClick={() => setShowQuickView(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 500,
              background: "#fff",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 14px 50px rgba(0,0,0,0.25)",
              animation: "fadeIn 0.3s",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: 18, borderBottom: "1px solid #eee" }}>
              <h5 style={{ margin: 0 }}>{quickViewProduct.name}</h5>
              <small style={{ color: "#555" }}>Brand: {quickViewProduct.brand}</small>
            </div>

            <div style={{ padding: 18, textAlign: "center" }}>
              <img
                src={
                  quickViewProduct.imageUrl?.startsWith("http")
                    ? quickViewProduct.imageUrl
                    : `http://localhost:4000/img/${quickViewProduct.imageUrl}`
                }
                alt="product"
                style={{ width: "100%", maxHeight: 280, objectFit: "contain" }}
              />

              <h3 style={{ marginTop: 18, color: "#00c8a3" }}>
                ₹{quickViewProduct.price.toLocaleString()}
              </h3>

              <p style={{ color: "#666", marginTop: 4 }}>
                {quickViewProduct.condition}
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, padding: 18 }}>
            </div>
          </div>
        </div>
      )}

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
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-25px); }
            to { opacity: 1; transform: translateY(0); }
          }

        .product-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 18px 40px rgba(0,34,51,0.12);
        }
      `}</style>

    </div>
  );
};

export default ProductPage;
