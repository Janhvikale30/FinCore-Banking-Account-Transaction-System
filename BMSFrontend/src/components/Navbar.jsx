import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const scrollToServices = () => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById("services")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document
        .getElementById("services")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo" onClick={() => goTo("/")}>
          <span className="logo-icon">🏦</span>

          <span>
            Online<span className="logo-highlight">Bank</span>
          </span>
        </div>

        {/* Navigation */}
        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <button
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => goTo("/")}
          >
            Home
          </button>

          <button
            className={`nav-link ${
              location.pathname === "/about-us" ? "active" : ""
            }`}
            onClick={() => goTo("/about-us")}
          >
            About
          </button>

          <button className="nav-link" onClick={scrollToServices}>
            Services
          </button>

          {/* Mobile buttons */}
          <button className="mobile-login" onClick={() => goTo("/login")}>
            Login
          </button>

          <button className="mobile-register" onClick={() => goTo("/register")}>
            Register
          </button>
        </div>

        {/* Desktop buttons */}
        <div className="nav-buttons">
          <button className="login-btn" onClick={() => goTo("/login")}>
            Login
          </button>

          <button className="register-btn" onClick={() => goTo("/register")}>
            Register
          </button>
        </div>

        {/* Hamburger */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
