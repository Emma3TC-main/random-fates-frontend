import { Link } from "react-router-dom";
import "animate.css";

import roulette from "../assets/404-roulette.png";

const ANIMATION_LABEL = "animate__animated animate__fadeInUp animate__fast";

const ANIMATION_TITLE = "animate__animated animate__fadeInUp animate__faster";

const ANIMATION_CARD = "animate__animated animate__fadeInUp animate__fast";

const ANIMATION_BUTTON = "animate__animated animate__fadeInUp animate__fast";

const SHARED_CARD =
  "rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl";

const TEXT_CARD = "text-sm uppercase tracking-[0.3em] text-slate-400";

const BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-8 py-4 mt-6 text-base font-semibold text-white shadow-xl shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-600 hover:shadow-cyan-500/30";

const infoCards = [
  {
    label: "No te preocupes",
    body: "Esta ruleta rota es solo un descanso. Tu próxima jugada sigue preparada.",
    delay: "animate__delay-1s",
  },
  {
    label: "Backstage",
    body: "Vuelve al inicio y recupera el control del sorteo antes de que gire otra vez.",
    delay: "animate__delay-1s",
  },
];

function NotFound() {
  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-sky-400/10 blur-3xl animate-pulse" />
      </div>

      <main className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-[32px] animate__animated animate__fadeIn animate__fast">
          <div className="relative flex h-[420px] items-center justify-center">
            <img
              src={roulette}
              alt="Ruleta rota de Random Fates"
              className="h-full w-full max-w-[520px] object-contain transition duration-500 hover:scale-[1.02]"
              onError={handleImageError}
            />
          </div>
        </div>

        {/* CONTENT */}
        <article className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
          {/* LABEL */}
          <span
            className={`${ANIMATION_LABEL} mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-500 backdrop-blur-sm`}
          >
            Página perdida en el sorteo
          </span>

          {/* TITLE */}
          <h1
            className={`${ANIMATION_TITLE} max-w-3xl text-5xl font-black tracking-tight text-slate-900 sm:text-6xl`}
          >
            Esta ruleta se quedó sin destino.
          </h1>

          {/* DESCRIPTION */}
          <p
            className={`${ANIMATION_TITLE} animate__delay-1s mt-6 max-w-2xl text-lg leading-8 text-slate-600`}
          >
            La suerte dio un giro inesperado y el sorteo aterrizó en un lugar
            que no existe. Regresa a la pista y recupera el control antes de que
            vuelva a girar.
          </p>

          {/* INFO CARDS */}
          <div className="mt-10 grid w-full gap-4 sm:max-w-xl">
            {infoCards.map(({ label, body, delay }) => (
              <section
                key={label}
                className={`${SHARED_CARD} ${ANIMATION_CARD} ${delay}`}
              >
                <p className={TEXT_CARD}>{label}</p>

                <p className="mt-2 text-base font-semibold text-slate-900">
                  {body}
                </p>
              </section>
            ))}
          </div>

          {/* BUTTON */}
          <Link
            to="/"
            className={`${BUTTON_CLASSES} ${ANIMATION_BUTTON} animate__delay-1s`}
          >
            Reiniciar la suerte
          </Link>
        </article>
      </main>
    </div>
  );
}

export default NotFound;
