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
} from "lucide-react";

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
      <button className="p-2 rounded-full hover:bg-gray-100">
        <Pencil size={16} />
      </button>

      <button className="p-2 rounded-full hover:bg-gray-100">
        <Eye size={16} />
      </button>

      {status === "Listo" && (
        <button className="p-2 rounded-full hover:bg-sky-100 text-sky-600">
          <Play size={16} />
        </button>
      )}

      {status === "Finalizado" && (
        <>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <BarChart3 size={16} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
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
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Sorteos
            </h1>
            <p className="text-slate-500 mt-1">
              Gestiona y supervisa todos tus sorteos desde un solo lugar
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-xl bg-white hover:bg-slate-50 flex items-center gap-2">
              <Upload size={16} />
              Importar participantes
            </button>

            <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl flex items-center gap-2 shadow-md">
              <Plus size={16} />
              Nuevo Sorteo
            </button>
          </div>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row justify-between gap-4 p-6 border-b">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, i) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    i === 0
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 border rounded-xl flex items-center gap-2 text-sm">
                Tipo: Todos
                <ChevronDown size={16} />
              </button>

              <button className="px-4 py-2 border rounded-xl flex items-center gap-2 text-sm">
                Orden: Última edición
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-left text-sm text-slate-500 border-b">
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
                {raffles.map((raffle) => (
                  <tr
                    key={raffle.id}
                    className="hover:bg-slate-50 transition border-b"
                  >
                    <td className="p-5">
                      <div className="font-semibold text-slate-900">
                        {raffle.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {raffle.id} · creado por {raffle.creator}
                      </div>
                    </td>

                    <td>{raffle.type}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[raffle.status]}`}
                      >
                        {raffle.status}
                      </span>
                    </td>

                    <td>{raffle.participants}</td>

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
          <div className="py-20 flex flex-col items-center text-center border-t">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
              <Clock3 className="text-emerald-600" size={28} />
            </div>

            <h3 className="text-lg font-semibold">
              Aún no tienes sorteos creados
            </h3>

            <p className="text-slate-500 mt-2 max-w-md">
              Crea tu primer sorteo y comienza a gestionar participantes,
              configuraciones y resultados en segundos.
            </p>

            <div className="flex gap-3 mt-6">
              <button className="px-5 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600">
                Crear tu primer sorteo
              </button>

              <button className="px-5 py-2 border rounded-xl hover:bg-slate-50">
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
