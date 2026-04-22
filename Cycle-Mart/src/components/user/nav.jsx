import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Nav = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) setUser(storedUser);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("userDetails"));
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newUser = JSON.parse(localStorage.getItem("userDetails"));
      if (JSON.stringify(newUser) !== JSON.stringify(user)) setUser(newUser);
    }, 500);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userDetails");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow sticky-top"
      style={{
        background: "linear-gradient(90deg, #001f3f, #002b5b, #001f3f)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
      }}
    >
      <div className="container py-2">
        {/* 🔷 Brand */}
        <NavLink
          className="navbar-brand d-flex align-items-center fw-bold text-light"
          to="/"
          style={{ fontSize: "1.4rem", letterSpacing: "0.5px" }}
        >
          <img
            src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/128506932/original/fc2cc4ed40a86e26ded7636386e2c9f3b0d9532d/make-a-fantastic-logo-for-you.jpg"
            alt="Cycle Mart Logo"
            className="img-fluid me-2 rounded-circle border border-light"
            style={{
              height: "48px",
              width: "48px",
              objectFit: "cover",
              boxShadow: "0 0 10px rgba(0,255,255,0.4)",
            }}
          />
          <span>Cycle Mart</span>
        </NavLink>

        {/* 🔹 Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            {[
              { to: "/", label: "Home" },
              { to: "/user/ProductPage", label: "Products" },
              // 🔥 Show only if user is logged in
              ...(user ? [
                { to: "/cart", label: "🛒 Cart" },
                { to: "/user/orders", label: "📦 Orders" },
              ] : []),
              { to: "/admin/login", label: "Admin" },
              { to: "/supplier/login", label: "Supplier" },
              { to: "/aboutus", label: "About Us" },
              { to: "/contactus", label: "Contact Us" },
            ].map((link, i) => (
              <li className="nav-item" key={i}>
                <NavLink
                  to={link.to}
                  end
                  className="nav-link fw-semibold text-light px-3 py-2 rounded-pill position-relative"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#00bfa6" : "transparent",
                    color: isActive ? "#001f3f" : "white",
                    transition: "all 0.3s ease",
                    boxShadow: isActive
                      ? "0 0 12px rgba(0,191,166,0.8)"
                      : "none",
                  })}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#00bfa6";
                    e.target.style.color = "#001f3f";
                    e.target.style.boxShadow =
                      "0 0 12px rgba(0,191,166,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    if (!e.target.classList.contains("active")) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "white";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* ✅ User Dropdown */}
            {user ? (
              <li className="nav-item dropdown ms-lg-3 position-relative">
                <button
                  className="btn d-flex align-items-center rounded-pill px-3 py-2 border-0 shadow-sm"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    backgroundColor: "#00bfa6",
                    color: "#001f3f",
                    transition: "all 0.2s ease",
                  }}
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "U"
                    )}&background=001f3f&color=00bfa6`}
                    alt="Avatar"
                    className="rounded-circle me-2 border border-light"
                    style={{ width: "36px", height: "36px" }}
                  />
                  <span className="fw-semibold">{user.name}</span>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end border-0 shadow p-2 mt-2"
                  aria-labelledby="userDropdown"
                  style={{
                    borderRadius: "15px",
                    animation: "fadeIn 0.2s ease",
                    minWidth: "190px",
                  }}
                >
                  <li>
                    <NavLink
                      className="dropdown-item py-2 rounded fw-semibold text-dark"
                      to="/profile"
                    >
                      👤 Profile
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider my-1" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger fw-semibold py-2 rounded"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item ms-lg-3">
                <NavLink
                  className="btn fw-semibold px-4 rounded-pill shadow-sm"
                  to="/login"
                  style={{
                    backgroundColor: "#00bfa6",
                    color: "#001f3f",
                  }}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
