import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const AdminLayout = () => {
  return (
    <div className="d-flex vh-100">
      <div className="left bg-dark text-light p-2" style={{ width: "200px" }}>
        <div className="py-3">Admin CMS</div>
        <hr />

        <Sidebar />
      </div>
      <div className="right flex-grow-1">
        <Header />

        <main className="main p-2" style={{ minHeight: "90vh" }}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};
