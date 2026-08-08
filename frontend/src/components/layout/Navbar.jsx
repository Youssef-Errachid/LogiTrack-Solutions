import { Bell, Sun, Moon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../../assets/Logo.png";
import "../../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo} className="logo-img" alt="LogiTrack Logo" />
      </div>

      <div className="actions">
        <button type="button" className="notification">
          <Bell size={22} />
          <span className="notification-counter">0</span>
        </button>
        <button
          type="button"
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}{" "}
        </button>
        <button type="button" className="btn-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
