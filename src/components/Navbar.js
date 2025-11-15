import React from "react";
import { Link } from "react-router-dom";

function Navbar({ darkMode, toggleTheme }) {
  const handleToggle = () => {
    console.log("Toggle button clicked! Current darkMode:", darkMode);
    toggleTheme();
  };

  return (
    <nav className={`navbar navbar-expand-lg shadow-sm sticky-top ${darkMode ? "navbar-dark bg-dark" : "navbar-dark bg-primary"}`}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">PakPulse</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/technology">Technology</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/sports">Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/business">Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/entertainment">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/health">Health</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/science">Science</Link>
            </li>

            <li className="nav-item ms-3">
              <button
                onClick={handleToggle}
                className={`btn ${darkMode ? "btn-outline-warning" : "btn-outline-light"} btn-sm px-4`}
                style={{ borderRadius: "50px" }}
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;