import React from "react";
import Navbar from "../components/web/navbar/Navbar.jsx";
import Footer from "../components/web/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import DividerSection from "../components/shared/dividerSection/DividerSection.jsx";
function Layout() {
  return (
    <div>
      <Navbar />
      <div className="container py-3">
        <Outlet />
      </div>
      <DividerSection />
      <Footer />
    </div>
  );
}

export default Layout;
