import { useEffect, useState } from "react";
import { Activity, CheckCircle2, PlayCircle, RefreshCw, Sparkles, Trophy, Users } from "lucide-react";
import "animate.css";
import AdminLayout from "../layouts/AdminLayout";
import { adminService } from "../services/adminService";
import { formatDate, getParticipantCount, labelState, labelType, shortId, stateStyles } from "../../utils/randomFatesFormat";

function AdminGames() {
  const [raffles, setRaffles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await adminService.getRaffles({ page: 1, limit: 100 });
      setRaffles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "No se pudieron cargar sorteos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const running = raffles.filter((raffle) => raffle.state === "ACTIVE").length;
  const finished = raffles.filter((raffle) => raffle.state === "FINISHED").length;
  const participants = raffles.reduce((sum, raffle) => sum + getParticipantCount(raffle), 0);

  return (
    <AdminLayout>
      <div className="relative">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300"><Sparkles size={14} className="animate-pulse" /> GAME CONTROL</div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Games Management</h1>
            <p className="mt-2 text-slate-400">Sorteos administrados por la plataforma.</p>
          </div>
          <button onClick={load} className="inline-flex items-center gap-2 rounded-full border border-green-500/10 bg-green-500/5 px-5 py-3 text-sm font-semibold text-green-400"><RefreshCw size={16} className={loading ? "animate-spin" : ""} /> REFRESH</button>
        </div>

        {error && <div className="mb-6 rounded-2xl border border-red-500/10 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatMiniCard icon={<Trophy size={20} />} title="Total Games" value={loading ? "…" : raffles.length} />
          <StatMiniCard icon={<PlayCircle size={20} />} title="Active" value={loading ? "…" : running} />
          <StatMiniCard icon={<CheckCircle2 size={20} />} title="Finished" value={loading ? "…" : finished} />
          <StatMiniCard icon={<Users size={20} />} title="Participants" value={loading ? "…" : participants} />
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/60 shadow-[0_10px_40px_rgba(6,182,212,0.05)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 border-b border-slate-800 px-8 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Raffle Sessions</h2>
              <p className="mt-1 text-sm text-slate-500">Estado operativo DRAFT → ACTIVE → FINISHED.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-sm font-semibold text-cyan-300"><Activity size={16} /> BACKEND LIVE</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-8 py-5 font-semibold">Sorteo</th>
                  <th className="px-8 py-5 font-semibold">Tipo</th>
                  <th className="px-8 py-5 font-semibold">Estado</th>
                  <th className="px-8 py-5 font-semibold">Participantes</th>
                  <th className="px-8 py-5 font-semibold">Creado</th>
                  <th className="px-8 py-5 font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody>
                {raffles.map((raffle) => (
                  <tr key={raffle.id} className="border-b border-slate-800/80 transition hover:bg-white/[0.02]">
                    <td className="px-8 py-6"><div className="font-semibold text-white">{raffle.title}</div><div className="mt-1 text-sm text-slate-500">{shortId(raffle.id)}</div></td>
                    <td className="px-8 py-6 text-slate-300">{labelType(raffle.type)}</td>
                    <td className="px-8 py-6"><span className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold ${stateStyles[raffle.state]}`}>{labelState(raffle.state)}</span></td>
                    <td className="px-8 py-6 text-slate-300">{getParticipantCount(raffle)}</td>
                    <td className="px-8 py-6 text-slate-500">{formatDate(raffle.createdAt)}</td>
                    <td className="px-8 py-6"><a href={`/raffles?raffleId=${raffle.id}`} className="rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-300">Abrir</a></td>
                  </tr>
                ))}
                {!loading && raffles.length === 0 && <tr><td colSpan="6" className="px-8 py-10 text-center text-slate-500">No hay sorteos registrados.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatMiniCard({ icon, title, value }) {
  return <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p><h3 className="mt-3 text-3xl font-bold text-white">{value}</h3></div><div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-cyan-300">{icon}</div></div></div>;
}

export default AdminGames;
