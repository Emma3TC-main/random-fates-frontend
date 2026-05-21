import { useEffect } from "react";
import "animate.css";

import {
  Plus,
  Upload,
  Trophy,
  Ticket,
  Gamepad2,
  FileSpreadsheet,
  ShieldCheck,
  LifeBuoy,
  Crown,
  Check,
  Sparkles,
  ArrowRight,
  Activity,
} from "lucide-react";

function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-100 via-slate-100 to-cyan-50 p-6">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-sky-300/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-cyan-200/10 blur-3xl" />
      </div>

      {/* HEADER */}
      <div className="animate__animated animate__fadeInDown mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm">
            <Sparkles size={16} className="animate-pulse" />
            Panel principal
          </div>

          <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold text-transparent">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Gestiona tus sorteos y participantes
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="group flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-lg animate__animated animate__fadeInRight">
            <Upload
              size={18}
              className="transition duration-300 group-hover:-translate-y-0.5"
            />
            Importar participantes
          </button>

          <button className="group flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black shadow-md transition duration-300 hover:scale-[1.03] hover:bg-cyan-300 hover:shadow-cyan-200/60 animate__animated animate__fadeInRight">
            <Plus
              size={18}
              className="transition duration-300 group-hover:rotate-90"
            />
            Nuevo Sorteo
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* Card 1 */}
        <div className="animate__animated animate__fadeInUp rounded-2xl border border-white/60 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-gray-500">
              SORTEOS TOTALES
            </p>

            <div className="rounded-xl bg-cyan-100 p-2 text-cyan-600">
              <Trophy size={18} />
            </div>
          </div>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">24</h2>

          <div className="mt-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            +3 esta semana
          </div>
        </div>

        {/* Card 2 */}
        <div className="animate__animated animate__fadeInUp rounded-2xl border border-white/60 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl animate__delay-1s">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-gray-500">
              EN ESTADO LISTO
            </p>

            <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
              <ShieldCheck size={18} />
            </div>
          </div>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">5</h2>

          <p className="mt-4 text-sm text-gray-500">Listos para ejecutar</p>
        </div>

        {/* Card 3 */}
        <div className="animate__animated animate__fadeInUp rounded-2xl border border-white/60 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl animate__delay-2s">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-gray-500">
              EN EJECUCIÓN
            </p>

            <div className="rounded-xl bg-cyan-100 p-2 text-cyan-600">
              <Activity size={18} className="animate-pulse" />
            </div>
          </div>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">2</h2>

          <div className="mt-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            Streaming WS activo
          </div>
        </div>

        {/* Card 4 */}
        <div className="animate__animated animate__fadeInUp rounded-2xl border border-white/60 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl animate__delay-3s">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-gray-500">
              ÚLTIMA EJECUCIÓN
            </p>

            <div className="rounded-xl bg-green-100 p-2 text-green-600">
              <Check size={18} />
            </div>
          </div>

          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            Hoy · 14:22
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Éxito
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Sorteo #018
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* QUICK ACCESS */}
        <div className="xl:col-span-2">
          <div className="animate__animated animate__fadeInLeft rounded-2xl border border-white/60 bg-white p-6 shadow-sm transition duration-300 hover:shadow-xl">
            <div className="mb-5">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <Sparkles className="text-cyan-500" size={22} />
                Accesos rápidos
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Acciones frecuentes del sistema
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <QuickButton icon={<Trophy size={20} />} title="Crear Sorteo" />

              <QuickButton icon={<Ticket size={20} />} title="Ir a Sorteos" />

              <QuickButton icon={<Gamepad2 size={20} />} title="Ver Juegos" />

              <QuickButton
                icon={<FileSpreadsheet size={20} />}
                title="Importar CSV"
              />

              <QuickButton
                icon={<ShieldCheck size={20} />}
                title="Verificar Hash"
              />

              <QuickButton icon={<LifeBuoy size={20} />} title="Soporte" />
            </div>
          </div>
        </div>

        {/* PREMIUM */}
        <div>
          <div className="animate__animated animate__fadeInRight relative overflow-hidden rounded-2xl bg-slate-900 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
            {/* glow */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-cyan-400/20 p-3 text-cyan-300 transition duration-300 hover:scale-110">
                  <Crown size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Mejora a Premium
                  </h2>

                  <p className="text-sm text-slate-400">
                    Desbloquea herramientas avanzadas
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <Benefit text="Importar CSV/XLSX" />
                <Benefit text="Hasta 50 000 participantes" />
                <Benefit text="Historial extendido" />
                <Benefit text="Soporte prioritario" />
              </div>

              <button className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-cyan-300">
                Ir a Premium
                <ArrowRight
                  size={18}
                  className="transition duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="animate__animated animate__fadeInUp mt-6 rounded-2xl border border-white/60 bg-white p-6 shadow-sm transition duration-300 hover:shadow-xl">
        <div className="mb-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Activity className="text-cyan-500" size={22} />
            Actividad reciente
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Últimos eventos del sistema
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          <ActivityItem
            title="Participantes cargados en 'Black Friday'"
            description="1284 entradas vía CSV"
            time="Hoy · 11:08"
          />

          <ActivityItem
            title="Sorteo '#018' ejecutado correctamente"
            description="Se seleccionaron 3 ganadores"
            time="Hoy · 09:32"
          />

          <ActivityItem
            title="Nuevo sorteo creado"
            description="Campaña 'Gaming Night'"
            time="Ayer · 18:45"
          />

          <ActivityItem
            title="Verificación hash completada"
            description="Integridad validada sin errores"
            time="Ayer · 16:20"
          />
        </div>
      </div>
    </div>
  );
}

/* QUICK BUTTON */
function QuickButton({ icon, title }) {
  return (
    <button className="group animate__animated animate__fadeInUp flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50 hover:shadow-lg">
      <div className="rounded-xl bg-gray-100 p-3 text-gray-700 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-100 group-hover:text-cyan-700">
        {icon}
      </div>

      <span className="font-medium text-gray-800 transition duration-300 group-hover:text-cyan-700">
        {title}
      </span>
    </button>
  );
}

/* BENEFITS */
function Benefit({ text }) {
  return (
    <div className="animate__animated animate__fadeInRight flex items-center gap-3">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 shadow-sm">
        <Check size={12} className="text-white" />
      </div>

      <span className="text-sm text-slate-300">{text}</span>
    </div>
  );
}

/* ACTIVITY ITEM */
function ActivityItem({ title, description, time }) {
  return (
    <div className="group animate__animated animate__fadeInUp flex flex-col justify-between gap-3 py-4 transition duration-300 hover:px-2 md:flex-row md:items-center">
      <div>
        <h3 className="font-medium text-gray-900 transition duration-300 group-hover:text-cyan-700">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <span className="text-sm text-gray-400 transition duration-300 group-hover:text-cyan-500">
        {time}
      </span>
    </div>
  );
}

export default Dashboard;