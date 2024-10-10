// ClientLayout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; // Import Outlet

const ClientLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This will render the nested route's component */}
      </main>
      <Footer />
    </>
  );
};

export default ClientLayout;
