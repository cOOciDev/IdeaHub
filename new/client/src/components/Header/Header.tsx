import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Globe, Menu, X } from "lucide-react"; // icons
import "./Header.scss";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleLang = () => {
    const next = i18n.language === "fa" ? "en" : "fa";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
    document.documentElement.setAttribute("dir", next === "fa" ? "rtl" : "ltr");
    document.documentElement.lang = next;
  };

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          🛡️ {t("title")}
        </Link>

        {/* Desktop Nav */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            {t("home")}
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            {t("about")}
          </NavLink>
          <NavLink to="/timeline" onClick={() => setMenuOpen(false)}>
            {t("timeline")}
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            {t("contact")}
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="actions">
          <button
            className="icon-btn"
            onClick={toggleLang}
            aria-label="Switch language"
          >
            <Globe size={20} />
            <span>{i18n.language.toUpperCase()}</span>
          </button>

          <button
            className="icon-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="icon-btn menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
