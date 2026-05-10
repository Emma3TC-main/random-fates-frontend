import { useEffect } from "react";
import { Check, Users, Shield, TrendingUp, Sparkles } from "lucide-react";

import { apiFetch } from "../api/client";

function Home() {
  useEffect(() => {
    apiFetch("/api/test")
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-500">
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
              <button className="rounded-2xl bg-cyan-400 px-7 py-4 font-semibold text-white shadow-xl shadow-cyan-400/30 transition hover:-translate-y-1 hover:bg-cyan-500">
                Empezar ahora
              </button>

              <button className="rounded-2xl border border-border bg-card px-7 py-4 font-semibold transition hover:bg-muted">
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
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Floating badge */}
              <div className="absolute -top-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-2xl">
                <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  LIVE
                </span>

                <span className="text-sm font-medium">248 participantes</span>
              </div>

              {/* Wheel */}
              <div className="relative aspect-square rounded-full bg-card p-4 shadow-2xl">
                <svg
                  viewBox="0 0 400 400"
                  className="h-full w-full animate-[spin_20s_linear_infinite]"
                >
                  <circle cx="200" cy="200" r="190" fill="white" />

                  <path
                    d="M 200 200 L 200 20 A 180 180 0 0 1 380 200 Z"
                    fill="#22d3ee"
                  />

                  <path
                    d="M 200 200 L 380 200 A 180 180 0 0 1 200 380 Z"
                    fill="#38bdf8"
                  />

                  <path
                    d="M 200 200 L 200 380 A 180 180 0 0 1 20 200 Z"
                    fill="#4ade80"
                  />

                  <path
                    d="M 200 200 L 20 200 A 180 180 0 0 1 200 20 Z"
                    fill="#fde047"
                  />

                  <circle cx="200" cy="200" r="60" fill="white" />

                  <text
                    x="200"
                    y="215"
                    textAnchor="middle"
                    fontSize="36"
                    fontWeight="bold"
                    fill="#0f172a"
                  >
                    RF
                  </text>
                </svg>

                {/* Pointer */}
                <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2">
                  <div className="h-0 w-0 border-l-[14px] border-r-[14px] border-t-[26px] border-l-transparent border-r-transparent border-t-slate-900" />
                </div>

                {/* Floating Cards */}
                <div className="absolute bottom-8 right-0 rounded-full border border-border bg-card px-4 py-2 text-xs shadow-xl">
                  ✓ Hash verificado
                </div>

                <div className="absolute left-0 top-1/2 rounded-full border border-border bg-card px-4 py-2 text-xs shadow-xl">
                  #winner
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-500">
              Características
            </span>

            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Todo lo que necesitas para sortear
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Plataforma moderna diseñada para eventos, streamers, marcas y
              comunidades.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* CARD */}
            <div className="group rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-500">
                <Users className="h-7 w-7" />
              </div>

              <h3 className="mb-3 text-2xl font-semibold">Participantes</h3>

              <p className="leading-relaxed text-muted-foreground">
                Gestiona listas, elimina duplicados y ejecuta sorteos en tiempo
                real.
              </p>
            </div>

            <div className="group rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-500">
                <Shield className="h-7 w-7" />
              </div>

              <h3 className="mb-3 text-2xl font-semibold">Transparencia</h3>

              <p className="leading-relaxed text-muted-foreground">
                Resultados auditables con evidencia verificable y hash seguro.
              </p>
            </div>

            <div className="group rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-500">
                <TrendingUp className="h-7 w-7" />
              </div>

              <h3 className="mb-3 text-2xl font-semibold">Escalable</h3>

              <p className="leading-relaxed text-muted-foreground">
                Desde pequeños eventos hasta miles de usuarios simultáneos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-10 text-center shadow-2xl md:p-16">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              ¿Listo para tu próximo sorteo?
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
              Empieza gratis y crea una experiencia moderna para tu audiencia.
            </p>

            <button className="rounded-2xl bg-cyan-400 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-cyan-400/30 transition hover:scale-[1.03] hover:bg-cyan-500">
              Crear cuenta
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
