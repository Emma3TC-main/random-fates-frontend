import { useEffect, useState } from "react";
import {
  Activity,
  Gamepad2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import "animate.css";
import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";
import GameStatusCard from "../components/GameStatusCard";
import { adminService } from "../services/adminService";
import { getParticipantCount, labelState } from "../../utils/randomFatesFormat";

function AdminDashboard() {
  const [kpis, setKpis] = useState(null);
  const [raffles, setRaffles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const [kpiData, raffleData] = await Promise.all([
        adminService.getKpis(),
        adminService.getRaffles({ page: 1, limit: 20 }),
      ]);
      setKpis(kpiData);
      setRaffles(Array.isArray(raffleData) ? raffleData : []);
    } catch (err) {
      setError(err.message || "No se pudo cargar el panel de administración.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const active = raffles.filter((raffle) => raffle.state === "ACTIVE");
  const finished = raffles.filter((raffle) => raffle.state === "FINISHED");

  return (
    <AdminLayout>
      <div className="relative">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" /> CENTRO DE CONTROL
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Panel de Administración
            </h1>
            <p className="mt-2 text-slate-400">
              Indicadores globales de rendimiento y supervisión en tiempo real
              de los sorteos.
            </p>
          </div>
          <button
            onClick={load}
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 px-5 py-3 text-sm font-semibold text-cyan-300"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />{" "}
            Actualizar datos
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/10 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <AdminStat
            title="Usuarios Registrados"
            value={kpis?.users ?? "…"}
            icon={Users}
          />
          <AdminStat
            title="Total Sorteos"
            value={kpis?.raffles ?? "…"}
            icon={Gamepad2}
          />
          <AdminStat
            title="Ejecuciones del Sistema"
            value={kpis?.executions ?? "…"}
            icon={Activity}
          />
          <AdminStat
            title="Resultados Emitidos"
            value={kpis?.results ?? "…"}
            icon={Trophy}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Panel
            title="Sorteos en Curso"
            helper="Monitoreo de salas activas listas para resolución"
          >
            {active.slice(0, 6).map((raffle) => (
              <GameStatusCard
                key={raffle.id}
                game={raffle.title}
                status={labelState(raffle.state)}
                participants={String(getParticipantCount(raffle))}
                winner="Pendiente"
              />
            ))}
            {active.length === 0 && (
              <Empty text="No se registran sorteos activos en este momento." />
            )}
          </Panel>
          <Panel
            title="Historial Concluido"
            helper="Trazabilidad y auditoría de eventos finalizados"
          >
            {finished.slice(0, 6).map((raffle) => (
              <GameStatusCard
                key={raffle.id}
                game={raffle.title}
                status={labelState(raffle.state)}
                participants={String(getParticipantCount(raffle))}
                winner="Ver resultado"
              />
            ))}
            {finished.length === 0 && (
              <Empty text="No se registran sorteos finalizados recientemente." />
            )}
          </Panel>
          <Panel
            title="Estado de la Infraestructura"
            helper="Seguridad y estado operativo global"
          >
            <div className="rounded-3xl border border-green-500/10 bg-green-500/5 p-6 text-green-300">
              <ShieldCheck className="mb-4" />
              Servicios en línea. Restricciones perimetrales activas y accesos
              administrativos protegidos mediante control de roles.
            </div>
          </Panel>
        </div>
      </div>
    </AdminLayout>
  );
}

function AdminStat({ title, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-xl">
      <StatCard title={title} value={value} icon={icon} />
    </div>
  );
}
function Panel({ title, helper, children }) {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/60 p-6 shadow-[0_10px_40px_rgba(6,182,212,0.05)]">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="mt-1 mb-5 text-sm text-slate-500">{helper}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Empty({ text }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm text-slate-400">
      {text}
    </div>
  );
}

export default AdminDashboard;
