import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminNavbar />

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
