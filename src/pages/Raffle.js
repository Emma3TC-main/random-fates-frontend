import {
  Plus,
  Upload,
  Play,
  RotateCcw,
  BarChart3,
  Pencil,
  Eye,
  Clock3,
  ChevronDown,
  Sparkles,
  Trophy,
  Users,
  Activity,
} from "lucide-react";

import "animate.css";

const raffles = [
  {
    id: "#024",
    name: "Sorteo iPhone 16 Pro",
    creator: "María",
    type: "Ruleta",
    status: "En Ejecución",
    participants: 1248,
    updated: "Hoy · 14:18",
  },
  {
    id: "#023",
    name: "Gift Card Gaming",
    creator: "Carlos",
    type: "Selección Aleatoria",
    status: "Listo",
    participants: 845,
    updated: "Hoy · 10:32",
  },
  {
    id: "#022",
    name: "Mega Sorteo VIP",
    creator: "Lucía",
    type: "Slots",
    status: "Finalizado",
    participants: 2050,
    updated: "Lun · 09:10",
  },
  {
    id: "#021",
    name: "Giveaway Setup",
    creator: "Admin",
    type: "Ruleta",
    status: "Configurado",
    participants: 320,
    updated: "Dom · 18:45",
  },
];

const statusStyles = {
  "En Ejecución": "bg-sky-100 text-sky-700",
  Listo: "bg-emerald-100 text-emerald-700",
  Finalizado: "bg-gray-100 text-gray-600",
  Configurado: "bg-blue-100 text-blue-700",
  Creado: "bg-yellow-100 text-yellow-700",
  Cancelado: "bg-rose-100 text-rose-700",
};

const filters = [
  "Todos",
  "Creado",
  "Configurado",
  "Listo",
  "En Ejecución",
  "Finalizado",
  "Cancelado",
];

function ActionButtons({ status }) {
  return (
    <div className="flex gap-2">
      <button className="rounded-full p-2 transition duration-300 hover:scale-110 hover:bg-gray-100">
        <Pencil size={16} />
      </button>

      <button className="rounded-full p-2 transition duration-300 hover:scale-110 hover:bg-gray-100">
        <Eye size={16} />
      </button>

      {status === "Listo" && (
        <button className="rounded-full p-2 text-sky-600 transition duration-300 hover:scale-110 hover:bg-sky-100">
          <Play size={16} />
        </button>
      )}

      {status === "Finalizado" && (
        <>
          <button className="rounded-full p-2 transition duration-300 hover:scale-110 hover:bg-gray-100">
            <BarChart3 size={16} />
          </button>

          <button className="rounded-full p-2 transition duration-300 hover:scale-110 hover:bg-gray-100">
            <RotateCcw size={16} />
          </button>
        </>
      )}
    </div>
  );
}

function Raffle() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="animate__animated animate__fadeInDown flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
              <Sparkles size={16} className="animate-pulse" />
              Gestión inteligente de sorteos
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Sorteos
            </h1>

            <p className="mt-1 text-slate-500">
              Gestiona y supervisa todos tus sorteos desde un solo lugar
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm">
              <Upload size={16} />
              Importar participantes
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lg">
              <Plus size={16} />
              Nuevo Sorteo
            </button>
          </div>
        </div>

        {/* Stats rápidas */}
        <div className="grid gap-5 md:grid-cols-3">
          <div className="animate__animated animate__fadeInUp rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Sorteos activos</p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">24</h2>
              </div>

              <div className="rounded-2xl bg-sky-100 p-3 text-sky-600">
                <Trophy size={24} />
              </div>
            </div>
          </div>

          <div className="animate__animated animate__fadeInUp animate__delay-0.5s rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Participantes</p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">4.4K</h2>
              </div>

              <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
                <Users size={24} />
              </div>
            </div>
          </div>

          <div className="animate__animated animate__fadeInUp animate__delay-0.5s rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Actividad reciente</p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">12</h2>
              </div>

              <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
                <Activity size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Card principal */}
        <div className="animate__animated animate__fadeInUp rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Filters */}
          <div className="flex flex-col justify-between gap-4 border-b p-6 lg:flex-row">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, i) => (
                <button
                  key={filter}
                  className={`rounded-full px-4 py-2 text-sm transition duration-300 hover:scale-[1.03] ${
                    i === 0
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition duration-300 hover:bg-slate-50">
                Tipo: Todos
                <ChevronDown size={16} />
              </button>

              <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition duration-300 hover:bg-slate-50">
                Orden: Última edición
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b text-left text-sm text-slate-500">
                <tr>
                  <th className="p-5">Nombre</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Participantes</th>
                  <th>Última edición</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {raffles.map((raffle, index) => (
                  <tr
                    key={raffle.id}
                    className={`animate__animated animate__fadeInUp border-b transition duration-300 hover:bg-slate-50`}
                    style={{
                      animationDelay: `${index * 0.08}s`,
                    }}
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                          <Trophy size={18} />
                        </div>

                        <div>
                          <div className="font-semibold text-slate-900">
                            {raffle.name}
                          </div>

                          <div className="text-sm text-slate-500">
                            {raffle.id} · creado por {raffle.creator}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                        {raffle.type}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[raffle.status]}`}
                      >
                        {raffle.status}
                      </span>
                    </td>

                    <td className="font-medium text-slate-700">
                      {raffle.participants}
                    </td>

                    <td className="text-slate-500">{raffle.updated}</td>

                    <td>
                      <ActionButtons status={raffle.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          <div className="animate__animated animate__fadeInUp flex flex-col items-center border-t py-20 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 shadow-inner">
              <Clock3 className="text-emerald-600 animate-pulse" size={28} />
            </div>

            <h3 className="text-lg font-semibold">
              Aún no tienes sorteos creados
            </h3>

            <p className="mt-2 max-w-md text-slate-500">
              Crea tu primer sorteo y comienza a gestionar participantes,
              configuraciones y resultados en segundos.
            </p>

            <div className="mt-6 flex gap-3">
              <button className="rounded-xl bg-sky-500 px-5 py-2 text-white transition duration-300 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lg">
                Crear tu primer sorteo
              </button>

              <button className="rounded-xl border px-5 py-2 transition duration-300 hover:bg-slate-50">
                Ver cómo funciona
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Raffle;
