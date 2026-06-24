import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";

import {
  useTheme,
} from "../context/ThemeContext";

import "./DashboardLayout.css";

function DashboardLayout({
  children,
}) {

  const { theme } =
    useTheme();

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (

    <div
      className={`layout ${theme}`}
    >

      {/* Mobile Header */}

      <header className="mobile-header">

        <button
          className="menu-btn"
          onClick={() =>
            setSidebarOpen(true)
          }
        >
          ☰
        </button>

        <h2>
          📚 BookNest
        </h2>

      </header>

      {/* Overlay */}

      {sidebarOpen && (

        <div
          className="overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        ></div>

      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main
        className="main-content"
      >
        {children}
      </main>

    </div>

  );

}

export default DashboardLayout;