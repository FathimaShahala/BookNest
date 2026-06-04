import Sidebar
from "../components/Sidebar/Sidebar";

import "./DashboardLayout.css";

function DashboardLayout({
  children
}) {

  return (
    <div className="layout">

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