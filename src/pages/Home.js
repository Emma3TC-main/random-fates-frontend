import { useEffect } from "react";

import { Users, Shield, TrendingUp, Trophy, Zap, Share2 } from "lucide-react";

import { apiFetch } from "../api/client";

import useStartNow from "../hooks/useStartNow";

import HeroSection from "../components/home/HeroSection";
import FeatureCard from "../components/home/FeatureCard";
import StatsSection from "../components/home/StatsSection";
import LiveActivitySection from "../components/home/LiveActivitySection";
import TestimonialCard from "../components/home/TestimonialCard";
import CTASection from "../components/home/CTASection";
import WhyRandomFatesSection from "../components/home/WhyRandomFatesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TrustSection from "../components/home/TrustSection";
import PricingSection from "../components/home/PricingSection";

function Home() {
  const { handleStartNow, handleCreateAccount, handleTryGames } = useStartNow();

  useEffect(() => {
    apiFetch("/health", { auth: false })
      .then((data) => {
        console.log("RandomFates API health:", data);
      })
      .catch((err) => {
        console.warn("RandomFates API health unavailable:", err.message);
      });
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <HeroSection
        handleStartNow={handleStartNow}
        handleTryGames={handleTryGames}
      />

      {/* FEATURES */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="animate__animated animate__fadeInUp mb-16 text-center">
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

          {/* Se expandió la rejilla reutilizando FeatureCard para dar mayor contenido y peso visual */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Users}
              title="Participantes"
              description="Gestiona listas, elimina duplicados y ejecuta sorteos en tiempo real."
            />

            <FeatureCard
              icon={Shield}
              title="Transparencia"
              description="Resultados auditables con evidencia certificada y validación pública inmediata."
            />

            <FeatureCard
              icon={TrendingUp}
              title="Escalable"
              description="Desde pequeños eventos locales hasta miles de usuarios simultáneos en vivo."
            />

            <FeatureCard
              icon={Trophy}
              title="Múltiples Premios"
              description="Asigna y distribuye diferentes categorías de premios en una sola sesión de juego."
            />

            <FeatureCard
              icon={Zap}
              title="Animaciones en Vivo"
              description="Elige entre ruletas, tragamonedas o selectores rápidos para mantener el dinamismo."
            />

            <FeatureCard
              icon={Share2}
              title="Acceso Compartido"
              description="Ofrece un enlace público para que tu audiencia compruebe la legitimidad del evento."
            />
          </div>
        </div>
      </section>

      <StatsSection />

      <LiveActivitySection />

      {/* TESTIMONIALS */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Comunidades que confían en RandomFates
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Streamers, eventos y comunidades usando sorteos verificables.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              name="Carlos"
              role="Streamer"
              comment="La experiencia visual y la transparencia hicieron que nuestra comunidad confiara mucho más en los sorteos."
            />

            <TestimonialCard
              name="Lucía"
              role="Event Manager"
              comment="Pudimos manejar miles de participantes sin problemas y todo se veía increíble."
            />

            <TestimonialCard
              name="Matías"
              role="Gaming Community"
              comment="Las animaciones y el sistema realtime le dieron un nivel totalmente distinto a nuestros eventos."
            />

            <TestimonialCard
              name="Valeria R."
              role="Marketing Director"
              comment="Excelente herramienta para dinámicas corporativas. La validación pública de ganadores nos ahorró disputas con los clientes."
            />

            <TestimonialCard
              name="Andrés G."
              role="Creador de Contenido"
              comment="Mis seguidores adoran la ruleta en vivo. Poder importar la lista de participantes en un clic agilizó mis transmisiones."
            />

            <TestimonialCard
              name="Sofía M."
              role="Comunidad de eSports"
              comment="La mejor opción para torneos competitivos donde los sorteos de llaves y premios necesitan ser 100% justos."
            />
          </div>
        </div>
      </section>

      <WhyRandomFatesSection />

      <HowItWorksSection />

      <TrustSection />

      <PricingSection />

      <CTASection handleCreateAccount={handleCreateAccount} />
    </div>
  );
}

export default Home;
