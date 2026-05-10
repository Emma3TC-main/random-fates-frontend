function About() {
  const values = [
    {
      title: "Transparencia",
      description:
        "Creamos sorteos claros y verificables para generar confianza en cada resultado.",
    },
    {
      title: "Accesibilidad",
      description:
        "Buscamos que cualquier persona pueda crear dinámicas profesionales sin herramientas complejas.",
    },
    {
      title: "Experiencia visual",
      description:
        "Diseñamos interfaces modernas y dinámicas para hacer los sorteos más atractivos.",
    },
    {
      title: "Escalabilidad",
      description:
        "La plataforma está preparada para crecer junto a comunidades, marcas y eventos digitales.",
    },
  ];

  const technologies = [
    "React + Vite",
    "TailwindCSS",
    "Node.js",
    "Socket.io",
    "PostgreSQL",
    "Prisma ORM",
  ];

  const journey = [
    {
      step: "1",
      title: "Detectamos un problema",
      desc: "Muchos sorteos digitales todavía dependen de procesos manuales y poco transparentes.",
    },
    {
      step: "2",
      title: "Diseñamos una solución",
      desc: "Creamos una plataforma enfocada en automatización, claridad y experiencia moderna.",
    },
    {
      step: "3",
      title: "Construimos RandomFates",
      desc: "Un sistema pensado para simplificar dinámicas promocionales y mejorar el engagement.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-8 md:px-10">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-60" />

        <div className="relative z-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Acerca de nosotros
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Conoce <span className="text-[#40CFFF]">RandomFates</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            RandomFates nace como una solución moderna para transformar la forma
            en que se realizan sorteos digitales. Nuestro objetivo es ofrecer
            una plataforma accesible, transparente y visualmente atractiva para
            creadores de contenido, comunidades, empresas y eventos online.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-[#40CFFF] px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:brightness-95">
              Explorar plataforma
            </button>

            <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Ver características
            </button>
          </div>
        </div>
      </div>

      {/* ABOUT + PURPOSE */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            NUESTRA MISIÓN
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Simplificar los sorteos digitales
          </h2>

          <p className="mt-5 leading-relaxed text-slate-600">
            Creemos que realizar un sorteo profesional no debería requerir
            procesos manuales, herramientas complicadas o conocimientos técnicos
            avanzados. Por eso desarrollamos una plataforma intuitiva,
            automatizada y enfocada en la experiencia del usuario.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Interfaz moderna y fácil de usar",
              "Resultados transparentes",
              "Automatización de participantes",
              "Experiencias interactivas",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"
              >
                <div className="h-3 w-3 rounded-full bg-[#40CFFF]" />

                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4 inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            NUESTRA VISIÓN
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Una nueva forma de interactuar
          </h2>

          <p className="mt-5 leading-relaxed text-slate-600">
            Buscamos convertir los sorteos en experiencias dinámicas, confiables
            y visualmente memorables. RandomFates combina tecnología y
            gamificación para aumentar la interacción entre marcas, comunidades
            y audiencias digitales.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Gamificación moderna",
              "Experiencia en tiempo real",
              "Mayor engagement",
              "Escalable y adaptable",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="mt-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900">
            Lo que define a RandomFates
          </h2>

          <p className="mt-3 text-slate-500">
            Construimos la plataforma alrededor de principios enfocados en
            confianza, simplicidad y experiencia digital.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100">
                <div className="h-6 w-6 rounded-full bg-[#40CFFF]" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {value.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* STORY + TECH */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">
            Cómo comenzó RandomFates
          </h2>

          <p className="mt-4 leading-relaxed text-slate-600">
            El proyecto surge a partir de la necesidad de contar con una
            herramienta más profesional, moderna y transparente para dinámicas
            digitales y promociones online.
          </p>

          <div className="mt-8 space-y-6">
            {journey.map((item, index) => (
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
          <h2 className="text-3xl font-bold text-slate-900">
            Tecnología detrás del sistema
          </h2>

          <p className="mt-4 leading-relaxed text-slate-600">
            Utilizamos herramientas modernas para construir una plataforma
            rápida, escalable y preparada para experiencias en tiempo real.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-[#40CFFF]" />

                  <span className="font-semibold text-slate-800">{tech}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <h4 className="font-semibold text-slate-900">
              Arquitectura moderna
            </h4>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              RandomFates utiliza una arquitectura desacoplada frontend/backend,
              optimizada para escalabilidad, mantenimiento y futuras mejoras.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-[32px] bg-[#15293E] p-8 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-white">
              Más que sorteos, experiencias digitales
            </h2>

            <p className="mt-3 text-slate-300">
              En RandomFates trabajamos para ofrecer herramientas modernas,
              accesibles y transparentes que ayuden a conectar mejor con las
              audiencias digitales.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-2xl border border-slate-600 bg-transparent px-5 py-3 text-sm font-medium text-white transition hover:bg-white/5">
              Saber más
            </button>

            <button className="rounded-2xl bg-[#40CFFF] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95">
              Probar plataforma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
