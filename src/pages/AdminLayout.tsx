import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar role="admin" />
    <main className="flex-1 p-8">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout; 