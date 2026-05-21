function TrustSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h3 className="mb-4 text-2xl font-bold">
              El frontend no decide el ganador
            </h3>

            <p className="text-muted-foreground">
              Cada ejecución guarda un registro verificable e inmutable
              firmado por el backend.
            </p>
          </div>

          <div className="animate__animated animate__fadeInLeft rounded-3xl bg-slate-950 p-6 font-mono text-sm text-slate-100 shadow-2xl shadow-cyan-500/10">
            <div className="space-y-3">
              <p>
                <span className="text-cyan-400">execution_id:</span>{" "}
                rf-82e5-48293-boo15
              </p>

              <p>
                <span className="text-cyan-400">timestamp:</span>{" "}
                2026-04-30T14:42:12Z
              </p>

              <p>
                <span className="text-cyan-400">winner:</span>{" "}
                user#42
              </p>

              <p>
                <span className="text-green-400">status:</span>{" "}
                verified ✓
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Transparencia
          </span>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Confianza por diseño
          </h2>

          <p className="mb-10 text-lg text-muted-foreground">
            Nada se decide en el navegador. El backend es la fuente
            de verdad.
          </p>

          <div className="space-y-6">
            {[
              {
                q: "¿Cómo se valida el resultado?",
                a: "El servidor firma cada ejecución usando hash criptográfico verificable.",
              },
              {
                q: "¿Qué se almacena?",
                a: "Participantes, timestamp, ganador y evidencia inmutable.",
              },
              {
                q: "¿Puedo exportarlo?",
                a: "Sí. Puedes descargar evidencia PDF o JSON.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="mb-2 text-lg font-semibold">
                  {faq.q}
                </h3>

                <p className="text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;