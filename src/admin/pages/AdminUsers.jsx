import { useEffect, useState } from "react";
import { Activity, Crown, RefreshCw, ShieldCheck, Sparkles, User2, Users } from "lucide-react";
import "animate.css";
import AdminLayout from "../layouts/AdminLayout";
import { adminService } from "../services/adminService";
import { formatDate, roleLabels } from "../../utils/randomFatesFormat";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await adminService.getUsers({ page: 1, limit: 100 });
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "No se pudieron cargar usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const admins = users.filter((user) => user.role === "ADMIN").length;
  const premium = users.filter((user) => user.subscriptionStatus === "ACTIVE" || user.role === "PREMIUM").length;
  const active = users.filter((user) => user.isActive).length;

  return (
    <AdminLayout>
      <div className="relative">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300"><Sparkles size={14} className="animate-pulse" /> USER CONTROL</div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Users</h1>
            <p className="mt-2 text-slate-400">Usuarios reales desde GET /users protegido por ADMIN.</p>
          </div>
          <button onClick={load} className="inline-flex items-center gap-2 rounded-full border border-green-500/10 bg-green-500/5 px-5 py-3 text-sm font-semibold text-green-400"><RefreshCw size={16} className={loading ? "animate-spin" : ""} /> REFRESH</button>
        </div>

        {error && <div className="mb-6 rounded-2xl border border-red-500/10 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MiniStatCard icon={<Users size={20} />} title="Total Users" value={loading ? "…" : users.length} />
          <MiniStatCard icon={<ShieldCheck size={20} />} title="Admins" value={loading ? "…" : admins} />
          <MiniStatCard icon={<Activity size={20} />} title="Active" value={loading ? "…" : active} />
          <MiniStatCard icon={<Crown size={20} />} title="Premium" value={loading ? "…" : premium} />
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/60 shadow-[0_10px_40px_rgba(6,182,212,0.05)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 border-b border-slate-800 px-8 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">User Directory</h2>
              <p className="mt-1 text-sm text-slate-500">Cuentas, roles y estado operativo.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-sm font-semibold text-cyan-300"><Activity size={16} /> RBAC ACTIVE</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-8 py-5 font-semibold">User</th>
                  <th className="px-8 py-5 font-semibold">Role</th>
                  <th className="px-8 py-5 font-semibold">Subscription</th>
                  <th className="px-8 py-5 font-semibold">Status</th>
                  <th className="px-8 py-5 font-semibold">Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-800/80 transition hover:bg-white/[0.02]">
                    <td className="px-8 py-6"><div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-cyan-300"><User2 size={20} /></div><div><p className="font-semibold text-white">{user.email}</p><p className="mt-1 text-sm text-slate-500">{user.id}</p></div></div></td>
                    <td className="px-8 py-6"><span className="inline-flex rounded-full border border-cyan-500/10 bg-cyan-500/5 px-4 py-2 text-xs font-semibold text-cyan-300">{roleLabels[user.role] || user.role}</span></td>
                    <td className="px-8 py-6 text-slate-300">{user.subscriptionStatus}</td>
                    <td className="px-8 py-6"><span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${user.isActive ? "border border-green-500/10 bg-green-500/5 text-green-400" : "border border-red-500/10 bg-red-500/5 text-red-300"}`}><span className={`h-2 w-2 rounded-full ${user.isActive ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />{user.isActive ? "Active" : "Inactive"}</span></td>
                    <td className="px-8 py-6 text-slate-500">{formatDate(user.createdAt)}</td>
                  </tr>
                ))}
                {!loading && users.length === 0 && <tr><td colSpan="5" className="px-8 py-10 text-center text-slate-500">No hay usuarios registrados.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function MiniStatCard({ icon, title, value }) {
  return <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p><h3 className="mt-3 text-3xl font-bold text-white">{value}</h3></div><div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-cyan-300">{icon}</div></div></div>;
}

export default AdminUsers;
