import Sidebar
from "../components/Sidebar/Sidebar";

import {
  useTheme,
} from "../context/ThemeContext";

import "./DashboardLayout.css";

function DashboardLayout({
  children,
}) {

  const { theme } =
    useTheme();

  return (
    <div
      className={`layout ${theme}`}
    >

      <Sidebar />

      <main
        className="main-content"
      >
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;