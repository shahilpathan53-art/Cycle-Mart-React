import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  // 🖼️ Online high-quality cycle images
  const images = [
    "/images/a1.png",
    "/images/a4.png",
    "/images/a3.png",
    "https://tse4.mm.bing.net/th/id/OIP.43tA15EnV6JQIFbuff2HAgHaFj?cb=ucfimg2ucfimg=1&w=800&h=600&rs=1&pid=ImgDetMain&o=7&rm=3",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔁 Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const topProducts = [
    {
      id: 1,
      name: "Mountain Bike X100",
      description: "High-performance mountain bike for all terrains.",
      price: "₹15,999",
      image: "http://localhost:4000/img/a1.png",
    },
    {
      id: 2,
      name: "Roadstar Cycle",
      description: "Specially designed for speed and comfort on city roads.",
      price: "₹10,999",
      image: "http://localhost:4000/img/a2.png",
    },
    {
      id: 3,
      name: "Electric Bike",
      description: "Powerful and eco-friendly — go farther with ease.",
      price: "₹30,999",
      image: "http://localhost:4000/img/a3.png",
    },
  ];

  return (
    <div className="home-page" style={{ overflowX: "hidden" }}>
      {/* 🌟 Hero Section */}
      <section className="hero-section text-white d-flex align-items-center py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Text */}
            <div className="col-md-6 text-center text-md-start hero-text">
              <h1 className="display-4 fw-bold mb-3 animate-text">
                Discover Premium Cycling Gear 🚴‍♂️
              </h1>
              <p className="lead mb-4 animate-text" style={{ opacity: 0.9 }}>
                From mountain adventures to city rides — Cycle Mart brings you
                the best bikes for every journey.
              </p>
              <NavLink
                to="/user/ProductPage"
                className="btn btn-light btn-lg fw-bold px-4 py-2 shadow-sm animate-btn"
                style={{
                  color: "#001f3f",
                  borderRadius: "30px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#00bfa6";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(0,191,166,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Shop Now →
              </NavLink>
            </div>

            {/* Right Image Slider */}
            <div className="col-md-6 text-center mt-4 mt-md-0 hero-img animate-img">
              <div className="image-slider-wrapper">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Cycle ${index + 1}`}
                    className={`slider-image ${
                      index === currentIndex ? "active" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏆 Top Products Section */}
      <section className="container my-5 fade-up">
        <h2
          className="text-center mb-5 fw-bold"
          style={{ color: "#001f3f", letterSpacing: "0.5px" }}
        >
          🔥 Our Bestselling Bicycles
        </h2>
        <div className="row g-4">
          {topProducts.map((product) => (
            <div className="col-md-4" key={product.id}>
              <div
                className="card border-0 h-100 shadow-lg position-relative overflow-hidden"
                style={{
                  borderRadius: "16px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,191,166,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 5px 15px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  className="text-center bg-light"
                  style={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid p-3"
                    style={{ height: "220px", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="fw-bold text-dark">{product.name}</h5>
                  <p className="text-muted small">{product.description}</p>
                  <h6 className="fw-bold text-success mb-3">{product.price}</h6>
                  <NavLink
                    to="/user/ProductPage"
                    className="btn btn-outline-success fw-semibold px-4"
                    style={{
                      borderRadius: "30px",
                      borderColor: "#00bfa6",
                      color: "#00bfa6",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#00bfa6";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.boxShadow =
                        "0 0 15px rgba(0,191,166,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#00bfa6";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🎯 CTA Section */} <section className="text-center text-white py-5 fade-up"
       style={{ background: "linear-gradient(135deg, #00bfa6 0%, #001f3f 100%)", }} >
         <div className="container"> 
          <h2 className="fw-bold mb-3">Ready to Ride?</h2> 
          <p className="lead mb-4" style={{ maxWidth: "600px", margin: "0 auto" }} > 
            Find your perfect match among hundreds of premium cycles designed for performance, comfort, and style. </p>
             <NavLink to="/user/ProductPage"
              className="btn btn-light btn-lg fw-bold px-4 py-2"
               style={{ color: "#001f3f", borderRadius: "30px", transition: "all 0.3s ease", }} 
               onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#00bfa6";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0,191,166,0.7)"; }}
                 onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.boxShadow = "none"; }} > Explore Now 🚴‍♂️ </NavLink>
                   </div>
                    </section>

      {/* ✨ Animation Styles */}
      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #001f3f, #003366, #00bfa6);
          background-size: 300% 300%;
          animation: gradientFlow 8s ease infinite;
          min-height: 80vh;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* 🖼️ Image Slider Animation */
        .image-slider-wrapper {
          position: relative;
          width: 100%;
          height: 450px; /* ✅ Increased height for better visibility */
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,191,166,0.4);
        }

        .slider-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.05);
          transition: opacity 1s ease, transform 2s ease;
          border-radius: 20px;
        }

        .slider-image.active {
          opacity: 1;
          transform: scale(1);
        }

        /* 📱 Responsive: adjust image height on small screens */
        @media (max-width: 768px) {
          .image-slider-wrapper {
            height: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
