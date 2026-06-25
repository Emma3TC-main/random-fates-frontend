import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import "animate.css";

import rouletteImg from "../assets/roulette.png";
import randomImg from "../assets/random.png";
import slotsImg from "../assets/slots.png";
import { raffleService } from "../services/raffleService";
import { createPlayableDemoRaffle } from "../services/demoSeedService";
import {
  getParticipantCount,
  labelState,
  labelType,
  stateStyles,
} from "../utils/randomFatesFormat";

const gameCards = [
  {
    title: "Ruleta",
    slug: "roulette",
    type: "ROULETTE",
    image: rouletteImg,
    description:
      "Una emocionante animación giratoria en pantalla que selecciona de forma transparente al ganador definitivo.",
    badge: "POPULAR",
    badgeColor: "bg-yellow-100 text-yellow-700",
    tags: ["Interactiva", "Certificada", "Transparente"],
  },
  {
    title: "Selección Aleatoria",
    slug: "random-selection",
    type: "RANDOM_PICKER",
    image: randomImg,
    description:
      "Ideal para listas numerosas; mezcla los nombres rápidamente y revela al afortunado al instante.",
    badge: "RÁPIDO",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["Masiva", "Instantánea", "Segura"],
  },
  {
    title: "Slots",
    slug: "slots",
    type: "SLOT",
    image: slotsImg,
    description:
      "Estilo máquina tragamonedas que incrementa la expectativa, asignando el premio con total imparcialidad.",
    badge: "GAMING",
    badgeColor: "bg-purple-100 text-purple-700",
    tags: ["Dinámica", "Animada", "Verificable"],
  },
];

function Games() {
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyType, setBusyType] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await raffleService.list({ page: 1, limit: 100 });
      setRaffles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los juegos activos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createDemoForType = async (type) => {
    try {
      setBusyType(type);
      const raffle = await createPlayableDemoRaffle(type);
      await load();
      return raffle;
    } catch (err) {
      setError(err.message || "No se pudo crear el juego de demostración.");
      return null;
    } finally {
      setBusyType("");
    }
  };

  const activeRaffles = raffles.filter((raffle) => raffle.state === "ACTIVE");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-slate-100 px-6 py-8 md:px-10">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:justify-between animate__animated animate__fadeInDown">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            <ShieldCheck size={16} /> Modalidades de Sorteo
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Salas de Juego
          </h1>
          <p className="mt-2 max-w-3xl text-slate-500">
            Selecciona el formato visual que prefieras para tu dinámica. Cada
            opción utiliza tu lista de participantes real y calcula los
            resultados con total imparcialidad y transparencia.
          </p>
        </div>
        <Link
          to="/raffles"
          className="rounded-2xl bg-[#40CFFF] px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:scale-[1.03]"
        >
          + Nuevo Sorteo
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {gameCards.map((game, index) => {
          const activeForType = activeRaffles.find(
            (raffle) => raffle.type === game.type,
          );
          const target = activeForType
            ? `/games/${game.slug}?raffleId=${activeForType.id}`
            : `/games/${game.slug}`;

          return (
            <div
              key={game.slug}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-60 overflow-hidden bg-gradient-to-br from-cyan-100 via-white to-sky-50 p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(64,207,255,0.25),transparent_45%)]" />
                <div className="relative z-10 flex items-start justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${game.badgeColor}`}
                  >
                    {game.badge}
                  </span>
                  <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
                    <span
                      className={`h-2 w-2 rounded-full ${activeForType ? "bg-green-500 animate-pulse" : "bg-slate-400"}`}
                    />
                    {activeForType ? "Disponible" : "Sin asignar"}
                  </div>
                </div>
                <div className="relative z-10 mt-6 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 scale-110 rounded-full bg-cyan-200/40 blur-3xl transition duration-500 group-hover:scale-125" />
                    <img
                      src={game.image}
                      alt={game.title}
                      className="relative z-10 h-40 object-contain drop-shadow-2xl transition duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 transition group-hover:text-cyan-700">
                  {game.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {game.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {activeForType && (
                  <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
                    <div className="font-bold">{activeForType.title}</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs">
                      <span>{labelType(activeForType.type)}</span>
                      <span>
                        {getParticipantCount(activeForType)} participantes
                      </span>
                      <span>{labelState(activeForType.state)}</span>
                    </div>
                  </div>
                )}
                <div className="mt-6 flex gap-3">
                  {activeForType ? (
                    <Link
                      to={target}
                      className="flex-1 rounded-2xl bg-[#40CFFF] px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:scale-[1.02]"
                    >
                      Iniciar juego activo
                    </Link>
                  ) : (
                    <button
                      onClick={async () => {
                        const raffle = await createDemoForType(game.type);
                        if (raffle?.id)
                          window.location.href = `/games/${game.slug}?raffleId=${raffle.id}`;
                      }}
                      disabled={busyType === game.type}
                      className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                    >
                      {busyType === game.type
                        ? "Generando..."
                        : "Probar una demo rápida"}
                    </button>
                  )}
                  <Link
                    to="/raffles"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Configurar
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            ¿Cómo funciona la dinámica?
          </h2>
          <div className="mt-8 space-y-6">
            {[
              [
                "1",
                "Selecciona o crea tu evento",
                "Asegúrate de registrar tus premios y la lista oficial de participantes.",
              ],
              [
                "2",
                "Prepara la sala de visualización",
                "Abre la pantalla de Ruleta, Selección o Slots para proyectarla ante tu audiencia.",
              ],
              [
                "3",
                "Realiza la asignación aleatoria",
                "El sistema calcula el ganador de forma instantánea, segura y transparente.",
              ],
              [
                "4",
                "Entrega y valida los resultados",
                "Obtén un comprobante público inalterable que certifica la legitimidad del sorteo.",
              ],
            ].map(([step, title, desc]) => (
              <Step key={step} step={step} title={title} desc={desc} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Sorteos listos para transmitir
          </h2>
          <div className="mt-6 space-y-3">
            {loading && <p className="text-slate-500">Cargando eventos...</p>}
            {!loading && activeRaffles.length === 0 && (
              <p className="rounded-2xl bg-slate-50 p-5 text-slate-500">
                No hay sorteos abiertos en este momento. Diseña uno nuevo o
                genera un juego de prueba.
              </p>
            )}
            {activeRaffles.slice(0, 6).map((raffle) => (
              <div
                key={raffle.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div>
                  <div className="font-bold text-slate-900">{raffle.title}</div>
                  <div className="text-sm text-slate-500">
                    {labelType(raffle.type)} · {getParticipantCount(raffle)}{" "}
                    participantes
                  </div>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${stateStyles[raffle.state]}`}
                >
                  {labelState(raffle.state)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 overflow-hidden rounded-[32px] bg-gradient-to-r from-[#15293E] via-[#19324d] to-[#15293E] p-8 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              ¿Todo listo para premiar a tus seguidores?
            </h2>
            <p className="mt-3 text-slate-300">
              Recuerda que una vez que un sorteo revela a su ganador oficial,
              queda guardado en tu historial permanente para garantizar la
              transparencia del concurso.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/raffles"
              className="rounded-2xl border border-slate-600 bg-transparent px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Administrar mis eventos
            </Link>
            <Link
              to="/raffles"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#40CFFF] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.03]"
            >
              Ir al Panel Principal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ step, title, desc }) {
  return (
    <div className="group flex gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#40CFFF] font-bold text-slate-900 shadow-md">
        {step}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900">{title}</h4>
        <p className="mt-1 text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

export default Games;
