function CTASection({ handleCreateAccount }) {
  return (
    <section className="px-4 pb-24">
      <div className="mx-auto max-w-7xl">
        <div
          className="
            animate__animated
            animate__fadeInUp
            overflow-hidden
            rounded-[2rem]
            border
            border-white/10
            bg-slate-950
            p-10
            text-center
            shadow-2xl
            md:p-16
          "
        >
          <div className="absolute inset-0 bg-cyan-400/5 blur-3xl" />

          <div className="relative">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              ¿Listo para tu próximo sorteo?
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
              Empieza gratis y crea una experiencia moderna para tu audiencia.
            </p>

            <button
              onClick={handleCreateAccount}
              className="
                rounded-2xl
                bg-cyan-400
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                shadow-xl
                shadow-cyan-400/30
                transition
                hover:scale-[1.03]
                hover:bg-cyan-500
              "
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
