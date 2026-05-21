import { Check } from "lucide-react";

function PricingSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Planes simples para empezar y escalar
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Prueba gratis lo esencial y desbloquea herramientas avanzadas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* FREE */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="mb-2 text-2xl font-bold">Free</h3>

            <p className="mb-6 text-muted-foreground">Perfecto para empezar</p>

            <div className="mb-8">
              <span className="text-5xl font-bold">$0</span>

              <span className="text-muted-foreground"> /always</span>
            </div>

            <div className="mb-8 space-y-4">
              {[
                "Crear sorteos básicos",
                "Carga manual",
                "Animaciones",
                "Hash verificable",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="text-cyan-400" size={18} />
                  <span>{item}</span>
                </div>
              ))}

              <div className="opacity-40 line-through">CSV/XLSX</div>

              <div className="opacity-40 line-through">Sorteos simultáneos</div>
            </div>

            <button className="w-full rounded-2xl border border-white/20 bg-white px-6 py-4 font-semibold text-black transition-all hover:bg-cyan-100">
              Empezar gratis
            </button>
          </div>

          {/* PREMIUM */}
          <div className="animate__animated animate__pulse animate__infinite relative rounded-3xl border border-cyan-400 bg-cyan-400/5 p-8 shadow-[0_0_80px_rgba(34,211,238,0.2)] transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-5 py-2 text-sm font-bold text-black">
              RECOMENDADO
            </div>

            <h3 className="mb-2 text-2xl font-bold">Premium</h3>

            <p className="mb-6 text-muted-foreground">Para equipos y marcas</p>

            <div className="mb-8">
              <span className="text-5xl font-bold">$9</span>

              <span className="text-muted-foreground"> /mes</span>
            </div>

            <div className="mb-8 space-y-4">
              {[
                "Todo lo del plan Free",
                "Carga CSV/XLSX",
                "Validación automática",
                "Mayor capacidad",
                "Soporte prioritario",
                "Exportación avanzada",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="text-cyan-400" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button className="w-full rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-black shadow-lg shadow-cyan-400/30 transition-all hover:bg-cyan-300">
              Empezar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
