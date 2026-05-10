function Games() {
  const games = [
    {
      title: "Ruleta",
      description:
        "Ideal para transmisiones en vivo y sorteos visuales interactivos.",
      badge: "POPULAR",
      badgeColor: "bg-yellow-100 text-yellow-700",
      tags: ["Visual", "En vivo", "Interacción"],
      available: true,
    },
    {
      title: "Selección Aleatoria",
      description:
        "Perfecto para sorteos rápidos y selección masiva de participantes.",
      badge: "RÁPIDO",
      badgeColor: "bg-blue-100 text-blue-700",
      tags: ["Masivo", "Rápido", "Automático"],
      available: true,
    },
    {
      title: "Slots",
      description:
        "Próximamente disponible para dinámicas gamificadas y premios.",
      badge: "PRÓXIMAMENTE",
      badgeColor: "bg-purple-100 text-purple-700",
      tags: ["Gaming", "Animado", "Nuevo"],
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-8 md:px-10">
      {/* HEADER */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Games
          </h1>
          <p className="mt-2 text-slate-500">
            Gestiona y crea sorteos interactivos para tu comunidad.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            Importar participantes
          </button>

          <button className="rounded-2xl bg-[#40CFFF] px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:scale-[1.02] hover:shadow-md">
            + Nuevo Sorteo
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-3">
        {games.map((game, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* IMAGE AREA */}
            <div className="relative h-52 bg-gradient-to-br from-cyan-100 to-sky-50 p-5">
              <div className="flex items-start justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${game.badgeColor}`}
                >
                  {game.badge}
                </span>

                <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      game.available ? "bg-green-500" : "bg-slate-400"
                    }`}
                  />
                  {game.available ? "Disponible" : "En desarrollo"}
                </div>
              </div>

              {/* Placeholder Visual */}
              <div className="mt-10 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-inner">
                  <div className="h-14 w-14 rounded-full border-8 border-[#40CFFF]" />
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">{game.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {game.description}
              </p>

              {/* TAGS */}
              <div className="mt-5 flex flex-wrap gap-2">
                {game.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* FOOTER */}
              <div className="mt-6 flex gap-3">
                {game.available ? (
                  <>
                    <button className="flex-1 rounded-2xl bg-[#40CFFF] px-4 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95">
                      Usar este juego
                    </button>

                    <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                      Vista previa
                    </button>
                  </>
                ) : (
                  <button className="w-full rounded-2xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-100">
                    Notificarme cuando esté
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INFO SECTION */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">¿Cómo funciona?</h2>

          <p className="mt-4 leading-relaxed text-slate-600">
            Todos los sorteos utilizan un sistema con{" "}
            <span className="font-semibold text-slate-900">
              hash verificable
            </span>{" "}
            para asegurar transparencia y resultados confiables.
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                step: "1",
                title: "Importa participantes",
                desc: "Sube tu lista manualmente o importa desde un archivo.",
              },
              {
                step: "2",
                title: "Configura el juego",
                desc: "Selecciona el tipo de dinámica y personaliza detalles.",
              },
              {
                step: "3",
                title: "Realiza el sorteo",
                desc: "Obtén resultados aleatorios y verificables en tiempo real.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#40CFFF] font-bold text-slate-900">
                  {item.step}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">{item.title}</h4>
                  <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Ventajas por tipo
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Ruleta",
                desc: "Experiencia visual perfecta para streaming y eventos.",
              },
              {
                title: "Aleatoria",
                desc: "Selección instantánea para grandes volúmenes.",
              },
              {
                title: "Slots",
                desc: "Dinámica gamificada con animaciones atractivas.",
              },
              {
                title: "Backend verificable",
                desc: "Resultados auditables y seguros para tus usuarios.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <h4 className="font-semibold text-slate-900">{item.title}</h4>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-[32px] bg-[#15293E] p-8 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              ¿Listo para crear tu sorteo?
            </h2>

            <p className="mt-3 text-slate-300">
              Comienza en segundos y crea experiencias interactivas para tu
              comunidad.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-2xl border border-slate-600 bg-transparent px-5 py-3 text-sm font-medium text-white transition hover:bg-white/5">
              Ver mis sorteos
            </button>

            <button className="rounded-2xl bg-[#40CFFF] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95">
              Crear sorteo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;
