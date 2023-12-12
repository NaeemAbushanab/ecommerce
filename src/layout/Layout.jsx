import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import DividerSection from "../components/dividerSection/DividerSection.jsx";
function Layout() {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <Outlet />
      </div>
      <DividerSection />
      <Footer />
    </>
  );
}

export default Layout;
