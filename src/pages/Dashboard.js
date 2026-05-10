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
} from "lucide-react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona tus sorteos y participantes
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50">
            <Upload size={18} />
            Importar participantes
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black shadow-md transition hover:bg-cyan-300">
            <Plus size={18} />
            Nuevo Sorteo
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-gray-500">
            SORTEOS TOTALES
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">24</h2>

          <div className="mt-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            +3 esta semana
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-gray-500">
            EN ESTADO LISTO
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">5</h2>

          <p className="mt-4 text-sm text-gray-500">
            Listos para ejecutar
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-gray-500">
            EN EJECUCIÓN
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">2</h2>

          <div className="mt-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            Streaming WS activo
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-gray-500">
            ÚLTIMA EJECUCIÓN
          </p>

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
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-gray-900">
                Accesos rápidos
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Acciones frecuentes del sistema
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <QuickButton
                icon={<Trophy size={20} />}
                title="Crear Sorteo"
              />

              <QuickButton
                icon={<Ticket size={20} />}
                title="Ir a Sorteos"
              />

              <QuickButton
                icon={<Gamepad2 size={20} />}
                title="Ver Juegos"
              />

              <QuickButton
                icon={<FileSpreadsheet size={20} />}
                title="Importar CSV"
              />

              <QuickButton
                icon={<ShieldCheck size={20} />}
                title="Verificar Hash"
              />

              <QuickButton
                icon={<LifeBuoy size={20} />}
                title="Soporte"
              />
            </div>
          </div>
        </div>

        {/* PREMIUM */}
        <div>
          <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cyan-400/20 p-3 text-cyan-300">
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

            <button className="mt-8 w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-black transition hover:bg-cyan-300">
              Ir a Premium
            </button>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
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
    <button className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left transition hover:border-cyan-300 hover:bg-cyan-50">
      <div className="rounded-xl bg-gray-100 p-3 text-gray-700">
        {icon}
      </div>

      <span className="font-medium text-gray-800">{title}</span>
    </button>
  );
}

/* BENEFITS */
function Benefit({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
        <Check size={12} className="text-white" />
      </div>

      <span className="text-sm text-slate-300">{text}</span>
    </div>
  );
}

/* ACTIVITY ITEM */
function ActivityItem({ title, description, time }) {
  return (
    <div className="flex flex-col justify-between gap-3 py-4 md:flex-row md:items-center">
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>

        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <span className="text-sm text-gray-400">{time}</span>
    </div>
  );
}

export default Dashboard;