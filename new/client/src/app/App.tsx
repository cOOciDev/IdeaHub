import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header/Header";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Timeline from "../pages/Timeline/Timeline";
import Contact from "../pages/Contact/Contact";
function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">{t("footer_text")}</div>
    </footer>
  );
}
export default function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = i18n.language || "fa";
    document.documentElement.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
    document.documentElement.lang = lang;
  }, [i18n.language]);
  return (
    <BrowserRouter>
      <Header />
      <main className="container" style={{ paddingTop: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <div className="card" style={{ marginTop: 16 }}>
                404
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
