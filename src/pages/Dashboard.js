import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Crown,
  FileSpreadsheet,
  Gamepad2,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";
import "animate.css";

import { dashboardService } from "../services/dashboardService";
import {
  createPlayableDemoRaffle,
  demoSeed,
  ensureDemoAuth,
} from "../services/demoSeedService";
import { getAuthUser } from "../services/authService";
import {
  formatDate,
  getParticipantCount,
  getPrizeCount,
  labelState,
  labelType,
  shortId,
  stateStyles,
} from "../utils/randomFatesFormat";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creatingDemo, setCreatingDemo] = useState(false);
  const [error, setError] = useState("");

  const user = getAuthUser();

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await dashboardService.summary();
      setSummary(data);
    } catch (err) {
      setError(err.message || "No se pudo cargar el dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDashboard();
  }, []);

  const raffles = useMemo(() => summary?.raffles || [], [summary]);
  const latest = raffles.slice(0, 6);
  const activePlayable = useMemo(
    () => raffles.find((raffle) => raffle.state === "ACTIVE"),
    [raffles],
  );

  const handleCreateDemo = async () => {
    try {
      setCreatingDemo(true);
      await ensureDemoAuth(user?.email || demoSeed.email, demoSeed.password);
      await createPlayableDemoRaffle("ROULETTE");
      await loadDashboard();
    } catch (err) {
      setError(err.message || "No se pudo crear el demo jugable.");
    } finally {
      setCreatingDemo(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-100 via-slate-100 to-cyan-50 p-6">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-sky-300/10 blur-3xl" />
      </div>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:justify-between animate__animated animate__fadeIn animate__faster">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm">
            <Sparkles size={16} className="animate-pulse" /> Panel de Control
            Oficial
          </div>
          <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold text-transparent">
            Resumen General
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Información sincronizada en tiempo real con tu cuenta corporativa.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={loadDashboard}
            disabled={loading}
            className="group flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50 disabled:opacity-60"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />{" "}
            Actualizar panel
          </button>
          <button
            onClick={handleCreateDemo}
            disabled={creatingDemo}
            className="hidden group items-center gap-2 rounded-xl border border-cyan-200 bg-white px-5 py-3 text-sm font-semibold text-cyan-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 disabled:opacity-60"
          >
            <FileSpreadsheet size={18} />{" "}
            {creatingDemo ? "Generando..." : "Generar evento demo"}
          </button>
          <Link
            to="/raffles"
            className="group flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black shadow-md transition hover:scale-[1.03] hover:bg-cyan-300"
          >
            <Plus size={18} /> Nuevo sorteo
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="SORTEOS TOTALES"
          value={loading ? "…" : summary?.totalRaffles || 0}
          icon={<Trophy size={18} />}
          helper="Registrados en tu historial"
        />
        <KpiCard
          title="PUBLICADOS"
          value={loading ? "…" : summary?.activeRaffles || 0}
          icon={<ShieldCheck size={18} />}
          helper="Listos para abrir en vivo"
        />
        <KpiCard
          title="FINALIZADOS"
          value={loading ? "…" : summary?.finishedRaffles || 0}
          icon={<Activity size={18} />}
          helper="Con ganadores certificados"
        />
        <KpiCard
          title="PARTICIPANTES"
          value={loading ? "…" : summary?.totalParticipants || 0}
          icon={<Users size={18} />}
          helper="Inscritos acumulados"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-white/60 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <Sparkles className="text-cyan-500" size={22} /> Acciones
                rápidas
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Accesos directos de administración.
              </p>
            </div>
            {activePlayable && (
              <Link
                to={`/games/roulette?raffleId=${activePlayable.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Iniciar transmisión activa <ArrowRight size={16} />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <QuickButton
              to="/raffles"
              icon={<Trophy size={20} />}
              title="Crear sorteo"
              description="Configura un nuevo concurso"
            />
            <QuickButton
              to="/raffles"
              icon={<Ticket size={20} />}
              title="Gestionar sorteos"
              description="Modifica premios y participantes"
            />
            <QuickButton
              to="/games"
              icon={<Gamepad2 size={20} />}
              title="Abrir minijuegos"
              description="Lanza la ruleta, random o slots"
            />
            <QuickButton
              to="/raffles"
              icon={<FileSpreadsheet size={20} />}
              title="Carga masiva"
              description="Asigna listas completas"
            />
            <QuickButton
              to="/games"
              icon={<ShieldCheck size={20} />}
              title="Verificar resultados"
              description="Validación pública y transparente"
            />
            <QuickButton
              to="#"
              icon={<Crown size={20} />}
              title="Configuración"
              description="Módulo en desarrollo · Restringido"
              className="pointer-events-none opacity-60"
            />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 shadow-lg">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cyan-400/20 p-3 text-cyan-300">
                <Crown size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Estado de cuenta
                </h2>
                <p className="text-sm text-slate-400">{user?.email}</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <InfoLine label="Rol de usuario" value={user?.role || "USER"} />
              <InfoLine
                label="Suscripción"
                value={user?.subscriptionStatus || "EXPIRED"}
              />
              <InfoLine label="Canal asignado" value={demoSeed.email} />
            </div>
            <Link
              to="/raffles"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-black transition hover:bg-cyan-300"
            >
              Administrar eventos <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/60 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Activity className="text-cyan-500" size={22} /> Sorteos recientes
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Últimos eventos registrados en la plataforma.
            </p>
          </div>
          <Link
            to="/raffles"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver todos
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
            Cargando sorteos...
          </div>
        ) : latest.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              Aún no tienes sorteos creados
            </h3>
            <p className="mt-2 text-slate-500">
              Crea un evento de demostración o registra tu primer sorteo
              oficial.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="border-b text-left text-sm text-slate-500">
                <tr>
                  <th className="p-5">Sorteo</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Participantes</th>
                  <th>Premios</th>
                  <th>Creado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {latest.map((raffle) => (
                  <tr
                    key={raffle.id}
                    className="border-b transition hover:bg-slate-50"
                  >
                    <td className="p-5">
                      <div className="font-semibold text-slate-900">
                        {raffle.title}
                      </div>
                      <div className="text-sm text-slate-500">
                        ID {shortId(raffle.id)}
                      </div>
                    </td>
                    <td>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                        {labelType(raffle.type)}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${stateStyles[raffle.state]}`}
                      >
                        {labelState(raffle.state)}
                      </span>
                    </td>
                    <td className="font-medium text-slate-700">
                      {getParticipantCount(raffle)}
                    </td>
                    <td className="font-medium text-slate-700">
                      {getPrizeCount(raffle)}
                    </td>
                    <td className="text-slate-500">
                      {formatDate(raffle.createdAt)}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/raffles?raffleId=${raffle.id}`}
                          className="rounded-xl border px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-white"
                        >
                          Gestionar
                        </Link>
                        {raffle.state === "ACTIVE" && (
                          <Link
                            to={`/games/roulette?raffleId=${raffle.id}`}
                            className="rounded-xl bg-cyan-400 px-3 py-2 text-xs font-semibold text-slate-900"
                          >
                            Iniciar
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, helper }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wide text-gray-500">
          {title}
        </p>
        <div className="rounded-xl bg-cyan-100 p-2 text-cyan-600">{icon}</div>
      </div>
      <h2 className="mt-3 text-4xl font-bold text-gray-900">{value}</h2>
      <p className="mt-4 text-sm text-gray-500">{helper}</p>
    </div>
  );
}

function QuickButton({ icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 group-hover:scale-105">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </Link>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

export default Dashboard;
