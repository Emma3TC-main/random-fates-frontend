import { Check, Sparkles } from "lucide-react";

import HeroWheel from "./HeroWheel";

function HeroSection({ handleStartNow, handleTryGames }) {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div className="animate__animated animate__fadeInLeft">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-500 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Sorteos auditables en tiempo real
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Sorteos digitales en{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent">
              tiempo real
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Crea, administra y ejecuta sorteos modernos con animaciones,
            gamificación y resultados verificables.
          </p>

          <div className="mb-10 flex flex-wrap gap-4">
            <button
              onClick={handleStartNow}
              className="
                rounded-2xl
                bg-cyan-400
                px-7
                py-4
                font-semibold
                text-white
                shadow-xl
                shadow-cyan-400/30
                transition
                hover:-translate-y-1
                hover:bg-cyan-500
              "
            >
              Empezar ahora
            </button>

            <button
              onClick={handleTryGames}
              className="
                rounded-2xl
                border
                border-border
                bg-card
                px-7
                py-4
                font-semibold
                transition
                hover:bg-muted
              "
            >
              Ver juegos →
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-cyan-400" />
              Sin tarjeta
            </div>

            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-cyan-400" />
              Hash verificable
            </div>

            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-cyan-400" />
              En vivo
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="animate__animated animate__fadeInRight">
          <HeroWheel />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
