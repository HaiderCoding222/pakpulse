import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Category from "./components/Category";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      console.log("Page load — Saved theme from localStorage:", savedTheme);

      if (savedTheme === "dark") {
        enableDarkMode();
      } else {
        enableLightMode();
      }
    };

    initializeTheme();
  }, []);

  const enableDarkMode = () => {
    document.documentElement.classList.add("dark-mode");
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#e0e0e0";
    setDarkMode(true);
    console.log("Dark mode ENABLED");
  };

  const enableLightMode = () => {
    document.documentElement.classList.remove("dark-mode");
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    setDarkMode(false);
    console.log("Light mode ENABLED");
  };

  const toggleTheme = () => {
    console.log("Toggle clicked. Current darkMode:", darkMode);
    
    if (darkMode) {
      enableLightMode();
      localStorage.setItem("theme", "light");
    } else {
      enableDarkMode();
      localStorage.setItem("theme", "dark");
    }

    // Force re-render of all components
    setTimeout(() => {
      window.dispatchEvent(new Event('themeChange'));
    }, 100);
  };

  return (
    <Router>
      <div className={darkMode ? "dark-mode-app" : "light-mode-app"}>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <div className="container mt-4 pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;