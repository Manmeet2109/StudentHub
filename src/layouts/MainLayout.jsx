import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;