function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Crea tu sorteo",
      description: "Elige el juego, asigna premios y define reglas básicas.",
    },
    {
      number: "2",
      title: "Carga participantes",
      description: "Manual o CSV/XLSX con validación automática.",
    },
    {
      number: "3",
      title: "Ejecuta en vivo",
      description: "Comparte el enlace y sortea en tiempo real.",
    },
    {
      number: "4",
      title: "Comparte resultados",
      description: "Descarga evidencia verificable con hash.",
    },
  ];

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Cómo funciona
          </span>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Cuatro pasos hasta tu próximo ganador
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Sin instalaciones ni configuraciones complejas.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`animate__animated animate__fadeInUp animate__delay-${index + 1}s rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40`}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-xl font-bold text-black shadow-lg shadow-cyan-400/30">
                {step.number}
              </div>

              <h3 className="mb-4 text-xl font-bold">{step.title}</h3>

              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
