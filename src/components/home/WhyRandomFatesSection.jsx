import { X, Check } from "lucide-react";

function WhyRandomFatesSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center animate__animated animate__fadeInUp">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            ¿Por qué RandomFates?
          </span>

          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Del Excel manual a una plataforma transparente
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Deja atrás los scripts caseros y la sospecha. Ofrece a tu audiencia
            una experiencia profesional, en vivo y verificable.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* BEFORE */}
          <div className="animate__animated animate__fadeInLeft rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <span className="mb-6 inline-flex rounded-full bg-red-500/10 px-4 py-1 text-sm font-semibold text-red-400">
              ANTES
            </span>

            <h3 className="mb-6 text-2xl font-bold">
              Problemas comunes
            </h3>

            <div className="space-y-5">
              {[
                "Herramientas manuales propensas a errores.",
                "Poca transparencia y poca confianza.",
                "Experiencia visual pobre y sin emoción.",
                "Sin evidencia auditable del resultado.",
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <X className="mt-1 text-red-400" size={20} />

                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AFTER */}
          <div className="animate__animated animate__fadeInRight rounded-3xl border border-cyan-400/40 bg-cyan-400/5 p-8 shadow-[0_0_60px_rgba(34,211,238,0.15)] transition-all duration-300 hover:scale-[1.02] hover:border-cyan-300">
            <span className="mb-6 inline-flex rounded-full bg-cyan-400/10 px-4 py-1 text-sm font-semibold text-cyan-300">
              AHORA
            </span>

            <h3 className="mb-6 text-2xl font-bold">
              Qué ofrece RandomFates
            </h3>

            <div className="space-y-5">
              {[
                "Plataforma SaaS lista para usar.",
                "Sorteos en vivo con cronómetro realtime.",
                "Resultados verificables mediante hash.",
                "Animaciones y juegos para enganchar audiencia.",
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <Check className="mt-1 text-cyan-400" size={20} />

                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyRandomFatesSection;