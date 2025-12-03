import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <Sidebar currentPath={location.pathname} />
        <div className="flex-1">
          <TopBar />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
