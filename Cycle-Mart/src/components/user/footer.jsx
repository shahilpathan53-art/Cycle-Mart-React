import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-white text-center py-4 mt-auto"
      style={{
        background: "linear-gradient(135deg, #001f3f, #004080)",
        color: "#ffffff",
        fontFamily: "Poppins, sans-serif",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <div className="container">
        {/* Social Links */}
        <div className="d-flex justify-content-center gap-4 mb-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-4"
            style={{ transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.color = "#00c8a3")}
            onMouseOut={(e) => (e.target.style.color = "#ffffff")}
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-4"
            style={{ transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.color = "#00c8a3")}
            onMouseOut={(e) => (e.target.style.color = "#ffffff")}
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-4"
            style={{ transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.color = "#00c8a3")}
            onMouseOut={(e) => (e.target.style.color = "#ffffff")}
          >
            <FaTwitter />
          </a>
        </div>

        {/* Copyright */}
        <p className="mb-2">
          &copy; {new Date().getFullYear()}{" "}
          <span style={{ color: "#00c8a3", fontWeight: "bold" }}>Cycle Mart</span>
          . All rights reserved.
        </p>

        {/* Links */}
        <div className="d-flex justify-content-center gap-4">
          <NavLink
            className="text-white text-decoration-none fw-semibold"
            to="/privacy"
            style={{ transition: "color 0.3s" }}
            onMouseOver={(e) => (e.target.style.color = "#00c8a3")}
            onMouseOut={(e) => (e.target.style.color = "#ffffff")}
          >
            Privacy Policy
          </NavLink>

          <NavLink
            className="text-white text-decoration-none fw-semibold"
            to="/contactus"
            style={{ transition: "color 0.3s" }}
            onMouseOver={(e) => (e.target.style.color = "#00c8a3")}
            onMouseOut={(e) => (e.target.style.color = "#ffffff")}
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
