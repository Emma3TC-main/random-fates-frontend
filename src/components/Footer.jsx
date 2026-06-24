import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-[#42DEE1]/20 bg-gradient-to-r from-[#3FC5F0] via-[#42DEE1] to-[#3FC5F0] text-white">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#EEF5B2]/20 blur-3xl animate__animated animate__fadeIn animate__slow" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#6DECB9]/20 blur-3xl animate__animated animate__fadeIn animate__slow animate__delay-1s" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* BRAND */}
          <div className="lg:col-span-1 animate__animated animate__fadeInUp">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-xl backdrop-blur transition-transform duration-500 group-hover:scale-105">
                <img
                  src={logo}
                  alt="RandomFates logo"
                  className="h-11 w-11 object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  RandomFates
                </h2>
                <p className="text-sm text-white/80">
                  Sorteos digitales modernos
                </p>
              </div>
            </Link>
            <p className="mt-6 max-w-md leading-relaxed text-white/80">
              Plataforma enfocada en experiencias interactivas, sorteos
              transparentes y dinámicas digitales modernas para comunidades,
              marcas y creadores de contenido.
            </p>
          </div>

          {/* INFO */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white animate__animated animate__fadeInUp animate__delay-1s">
              Plataforma
            </h3>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur animate__animated animate__fadeInUp animate__delay-1s">
                <p className="text-sm font-medium text-white">
                  Resultados verificables
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  Sorteos diseñados para generar confianza y transparencia.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur animate__animated animate__fadeInUp animate__delay-2s">
                <p className="text-sm font-medium text-white">
                  Experiencias modernas
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  Interfaces visuales dinámicas para eventos y comunidades.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px w-full bg-white/15 animate__animated animate__fadeIn animate__delay-2s" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row animate__animated animate__fadeInUp animate__delay-2s">
          <p className="text-white/80">
            © 2026 RandomFates. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5 text-white/70">
            <button className="transition hover:text-white hover:underline decoration-[#EEF5B2]/40 underline-offset-4">Privacidad</button>
            <button className="transition hover:text-white hover:underline decoration-[#EEF5B2]/40 underline-offset-4">Términos</button>
            <button className="transition hover:text-white hover:underline decoration-[#EEF5B2]/40 underline-offset-4">Soporte</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;